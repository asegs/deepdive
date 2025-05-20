const express = require('express')
const fs = require('node:fs');
const app = express()
const port = 3000

app.get('/doc/:docId', (req, res) => {
    res.type('json')
    fs.readFile('records/' + req.params.docId + ".json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.send('No file!')
        } else {
            res.send(data)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
