
const
fs = require('fs'),

read = queryFn =>
  queryFn(JSON.parse(fs.readFileSync('store.json', 'utf8') || '{}')),

update = queryFn => {
  const file = fs.readFileSync('store.json', 'utf8') || '{}',
        store = JSON.parse(file)
  try {
    const result = queryFn(store),
          json = JSON.stringify(store, ' ', 2)
    if (file != json) fs.writeFileSync('store.json', json)
    return result
  }
  catch {
    throw new Error('New store state must be JSON-stringifiable!')
  }
}


module.exports = {read, update}