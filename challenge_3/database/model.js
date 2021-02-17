const db = require('./db')

const convertValues = (data, valuesOnly) => {
  if (valuesOnly) {
    var values = ''
    for (var key in data) {
      values += '"' + data[key] + '",'
    }
    return values.slice(0, values.length - 1)
  } else {
    params = []
    values = []
    for (var key in data) {
      params.push(`${key} = ?`)
      values.push(data[key])
    }
    return [params, values]
  }
}

module.exports = {
  add: (data) => {
    values = convertValues(data, true);
    queryString = `INSERT INTO users (${Object.keys(data)}) values (${values});`
    return new Promise((resolve, reject) => {
      db.query(queryString, values, (err, results, fields) => {
        if (err) { reject(err) }
        resolve(results)
      })
    })
  },

  update: (data) => {
    console.log('Server: incoming data:', data)
    options = data.options

    var converted = convertValues(options, false);
    columns = converted[0]
    values = converted[1]
    values.push(data.id)

    queryString = `UPDATE users SET ${columns} WHERE id = ?;`
    console.log(queryString)
    return new Promise((resolve, reject) => {
      db.query(queryString, values, (err, results, fields) => {
        console.log(results)
        if (err) { reject(err) }
        resolve(results)
      })
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