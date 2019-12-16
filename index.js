
const
fs = require('fs'),
jsonClone = obj => JSON.parse(JSON.stringify(obj)),

read = queryFn => {
  const backup = jsonClone(store),
        result = queryFn(store)
  if (JSON.stringify(store) == JSON.stringify(backup))
    return jsonClone(result)
  store = backup
  throw new Error('Only read query operations allowed!')
},

update = queryFn => {
  const backup = jsonClone(store)
  try {
    const result = queryFn(store)
    fs.writeFileSync('store.json', JSON.stringify(store, ' ', 2))
    return jsonClone(result)
  }
  catch {
    store = backup
    throw new Error('New store state must be JSON-stringifiable!')
  }
}

let store = JSON.parse(fs.readFileSync('store.json', 'utf8') || '{}')

// module.exports = {read, update}
module.exports = require('./store/fsDirectSync')