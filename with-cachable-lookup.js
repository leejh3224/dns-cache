const express = require('express')
const CacheableLookup = require('cacheable-lookup')

const cacheable = new CacheableLookup({ maxTtl: 10 })

const app = express()

let requests = 0
let errors = 0

app.get('/dns-lookup', async (req, res) => {
    requests++
    cacheable.lookup('account.zigbang.com', {}, (err, address) => {
        if (err) errors++ 
    })
    res.status(200).end()
})

app.get('/errors', (req, res) => {
    console.log('req = ', requests, ' errors = ', errors)
    res.end()
})

app.listen(8080, () => console.log('started'))
