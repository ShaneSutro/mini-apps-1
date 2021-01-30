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
  var multerFile = JSON.parse(Buffer.from(req.file.buffer).toString('utf8'));
  if (multerFile) {
    var htmlReturn = parseData(multerFile);
  }
  const fileData = fs.readFileSync(path.join(__dirname, '/client/index.html'), {
    encoding: 'utf8',
  });
  res.end(fileData + htmlReturn);
});

app.get('/download', (req, res, next) => {
  res.download(__dirname + '/client/report.csv', 'report.csv')
})

app.listen(port, (err) => {
  console.log('Listening on port', port);
});

var parseData = (data) => {
  var columns = ['<th>index</th><th>parentRecord</th>'];
  var csvHeaders = ['index,parentRecord'];
  var rows = [];
  var csvRows = [];
  var rowIndex = 1;
  var parseItem = (item, parentRecord='') => {
    var row = [];
    var csvRow = [];
    for (key in item) {
      var index = columns.indexOf(`<th>${key}</th>`);
      if (index < 0 && key !== 'children') {
        columns.push(`<th>${key}</th>`);
        csvHeaders.push(key)
        index = columns.length - 1;
      }
      if (key !== 'children') {
        csvRow.splice(index, 0, item[key]);
        row.splice(index, 0, `<td>${item[key]}</td>`);
      }
    }
    rows.push(`<tr><td>${rowIndex}</td><td>${parentRecord}</td>${row.join('')}</tr>`);
    csvRows.push(`${rowIndex},${parentRecord},` + csvRow.join(','));
    rowIndex++;

    if (item.children && item.children.length > 0) {
      parentRecord === '' ? parentRecord = 1 : parentRecord++;
      for (var i = 0; i < item.children.length; i++) {
        parseItem(item.children[i], parentRecord);
      }
    }
  };
  parseItem(data);
  csvString = csvHeaders.join(',') + '\n' + csvRows.join('\n');
  fs.writeFile(path.join(__dirname, '/client/report.csv'), csvString, (err) => {
    if (err) {
      console.log('Error writing to file!', err);
    } else {
      console.log('Success!');
    }
  })
  return `<table style="border: 1px solid black"><tr>${columns.join('')}</tr>${rows.join('')}</table>`;
};
