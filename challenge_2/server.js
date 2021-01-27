const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const port = 3000;

app.use(express.static('./client'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/', upload.single('upload'), (req, res, next) => {
  var data = req.body.text ? JSON.parse(req.body.text) : {};
  var multerFile = JSON.parse(Buffer.from(req.file.buffer).toString('utf8'));
  console.log(multerFile);
  if (multerFile) {
    var htmlReturn = parseData(multerFile);
  }
  // stream.once('open', () => {
  //   var string = keys.join(',') + '\n';
  //   string += Object.values(data).join(',')
  //   stream.write(string);
  //   stream.end();
  // })
  const fileData = fs.readFileSync(path.join(__dirname, '/client/index.html'), {
    encoding: 'utf8',
  });
  res.end(fileData + htmlReturn);
});

app.get('/text', (req, res) => {
  res.sendFile(path.join(__dirname, '/samples/csv_report.csv'));
});

app.listen(port, (err) => {
  console.log('Listening on port', port);
});

var parseData = (data) => {
  var columns = [];
  var rows = [];
  var parseItem = (item) => {
    var row = [];
    for (key in item) {
      var index = columns.indexOf(`<th>${key}</th>`);
      if (index < 0 && key !== 'children') {
        columns.push(`<th>${key}</th>`);
        index = columns.length - 1;
      }
      if (key !== 'children') {
        row.splice(index, 0, `<td>${item[key]}</td>`);
      }
    }
    rows.push(`<tr>${row.join('')}</tr>`);

    if (item.children && item.children.length > 0) {
      for (var i = 0; i < item.children.length; i++) {
        parseItem(item.children[i]);
      }
    }
  };
  parseItem(data);
  return `<table style="border: 1px solid black"><tr>${columns.join(
    ''
  )}</tr>${rows.join('')}</table>`;
};
