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

app.post('/users', (req, res) => {
  model.add(req.body)
    .then(result => res.send(JSON.stringify(result)))
    .catch(result => res.sendStatus(400))
})

app.post('/next', (req, res) => {
  console.log('Updating at /next')
  model.update(req.body)
    .then(result => res.send(JSON.stringify(result)))
    .catch(result => res.sendStatus(400))
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
