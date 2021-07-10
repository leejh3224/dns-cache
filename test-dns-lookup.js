const express = require('express')
const dns = require('dns')

const app = express()

let requests = 0
let errors = 0

app.get('/dns-lookup', async (req, res) => {
    requests++
    dns.lookup('account.zigbang.com', (err, address) => {
        if (err) errors++ 
    })
    res.status(200).end()
})

app.get('/errors', (req, res) => {
    console.log('req = ', requests, ' errors = ', errors)
    res.end()
})

app.listen(8080, () => console.log('started'))
