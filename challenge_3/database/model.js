const db = require('./db')

module.exports = {
  add: (data) => {
    queryString = 'INSERT INTO users ' + Object.keys(data) + 'values' + Object.values(data)
    db.query(queryString, (err, results, fields) => {
      console.log(err, results)
    })
  },

  getTables: () => {
    db.query('SHOW TABLES;', (err, results, fields) => {
      if (err) {
        throw err
      } else {
        console.log(results, fields)
      }
    })
  }
}