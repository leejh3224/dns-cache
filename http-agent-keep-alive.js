const express = require('express')
const https = require('https')
const axios = require('axios').default
const CacheableLookup = require('cacheable-lookup')

const app = express()
const cacheable = new CacheableLookup()
cacheable.install(https.globalAgent)

let requests = 0
let errors = 0
const client = axios.create({
    timeout: 3 * 1000,
    httpsAgent: new https.Agent({ 
        keepAlive: true,
        maxSockets: 100,
        maxFreeSockets: 10,
        timeout: 35 * 1000,
        freeSocketTimeout: 15 * 1000
    }),
})

app.get('/dns-lookup', async (req, res) => {
    requests++
    await client.get('https://account.zigbang.net').catch((e) => {
        errors++
    })
    res.status(200).end()
})

app.get('/errors', (req, res) => {
    console.log('req = ', requests, ' errors = ', errors)
    res.end()
})

app.listen(8080, () => console.log('started'))
