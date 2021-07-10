const express = require('express')
const axios = require('axios').default

const app = express()

let requests = 0
let errors = 0

app.get('/dns-lookup', async (req, res) => {
    requests++
    const client = axios.create({
        timeout: 3 * 1000,
    })
    await client.get('https://account.zigbang.com').catch((e) => errors++)
    res.status(200).end()
})

app.get('/errors', (req, res) => {
    console.log('req = ', requests, ' errors = ', errors)
    res.end()
})

app.listen(8080, () => console.log('started'))
