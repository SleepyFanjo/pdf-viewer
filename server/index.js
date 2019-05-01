const express = require('express')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

const util = require('util')
const { handleWsMessage } = require('./websocket')

const exec = util.promisify(require('child_process').exec)

const app = express()

// Endpoints for controlling the client through API
app.post('/api/nextPage/:clientId?', (req, res) => {
  handleWsMessage('nextPage', req.params.clientId)
  res.sendStatus(200)
})
app.post('/api/previousPage/:clientId?', (req, res) => {
  handleWsMessage('previousPage', req.params.clientId)
  res.sendStatus(200)
})
app.post('/api/firstPage/:clientId?', (req, res) => {
  handleWsMessage('firstPage', req.params.clientId)
  res.sendStatus(200)
})
app.post('/api/lastPage/:clientId?', (req, res) => {
  handleWsMessage('lastPage', req.params.clientId)
  res.sendStatus(200)
})
app.post('/api/toggleAutorotateOn/:clientId?', (req, res) => {
  handleWsMessage('toggleAutorotateOn', req.params.clientId)
  res.sendStatus(200)
})
app.post('/api/toggleAutorotateOff/:clientId?', (req, res) => {
  handleWsMessage('toggleAutorotateOff', req.params.clientId)
  res.sendStatus(200)
})
app.post('/api/toggleAutorotate/:clientId?', (req, res) => {
  handleWsMessage('toggleAutorotate', req.params.clientId)
  res.sendStatus(200)
})
app.post('/api/increaseAutorotateDelay/:clientId?', (req, res) => {
  handleWsMessage('increaseAutorotateDelay', req.params.clientId)
  res.sendStatus(200)
})
app.post('/api/decreaseAutorotateDelay/:clientId?', (req, res) => {
  handleWsMessage('decreaseAutorotateDelay', req.params.clientId)
  res.sendStatus(200)
})

// Endpoint to upload and convert PPT documents to PDF
app.post('/convert', function(req, res) {
  new formidable.IncomingForm()
    .parse(req)
    .on('fileBegin', (name, file) => {
      file.path = __dirname + '/' + file.name
    })
    .on('file', (name, file) => {
      exec('unoconv -f pdf "' + file.path + '"').then(response => {
        fs.unlink(file.path, err => {
          if (err) throw err
        })
        const pdfFileName = path.parse(file.path).name + '.pdf'
        res.writeHead(200, {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': 'attachment; filename=' + pdfFileName
        })
        const stream = fs
          .createReadStream(__dirname + '/' + pdfFileName)
          .pipe(res)
        stream.on('close', () => {
          fs.unlink(__dirname + '/' + pdfFileName, err => {
            if (err) throw err
          })
        })
      })
    })
})

app.listen(3001, function() {
  console.log('Listening on port 3001')
})
