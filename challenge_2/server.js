const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('./client'))
app.use(bodyParser.urlencoded( { extended: true }));

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.post('/', (req, res) => {
  console.log(JSON.parse(req.body.text))
  res.end('<h1>Done</h1>');
})

app.get('/text', (req, res) => {
  res.sendFile(path.join(__dirname, '/samples/csv_report.csv'))
})

app.listen(port, (err) => {
  console.log('Listening on port', port)
})
