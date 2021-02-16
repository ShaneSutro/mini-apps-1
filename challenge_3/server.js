const express = require('express')
const app = express();
const path = require('path')
const parser = require('body-parser');
const PORT = 3000
const model = require('./database/model')

app.use(parser.json());
app.use(express.static(path.join(__dirname, '/public')))
console.log(path.join(__dirname, '/public'))

app.get('/', (req, res) => {
  res.sendFile('./index.html')
})

app.get('/tables', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
