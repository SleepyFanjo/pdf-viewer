const express = require('express')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

const app = express()

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
