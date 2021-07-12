const express = require('express')
const HttpsAgent = require('agentkeepalive').HttpsAgent
const axios = require('axios').default
const CacheableLookup = require('cacheable-lookup')

const app = express()
const cacheable = new CacheableLookup()

let requests = 0
let errors = 0

app.get('/dns-lookup', async (req, res) => {
    requests++
    const client = axios.create({
        timeout: 3 * 1000,
        httpsAgent: new HttpsAgent({
            lookup: cacheable.lookup
        }),
    })
    await client.get('https://account.zigbang.com').catch((e) => errors++)
    res.status(200).end()
})

app.get('/errors', (req, res) => {
    console.log('req = ', requests, ' errors = ', errors)
    res.end()
})

app.listen(8080, () => console.log('started'))
