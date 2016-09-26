const express = require('express')

const port = process.env.PORT || 8080
const basedir = __dirname + '/public'

const app = express()

// Middleware: serve static files
.use(express.static(basedir))

// Middleware: serve index.html for everything else
.get('*', function (request, response) {
  response.sendFile('index.html', { root: basedir })
})

// Start listening
.listen(port)
console.log(`Server started at port ${port}`)
