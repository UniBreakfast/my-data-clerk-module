
const
fsp = require('fs').promises,
jsonClone = obj => JSON.parse(JSON.stringify(obj)),

read = async queryFn => {
  const backup = jsonClone(store),
        result = await queryFn(store)
  if (JSON.stringify(store) == JSON.stringify(backup))
    return jsonClone(result)
  store = backup
  throw new Error('Only read query operations allowed!')
},

update = async queryFn => {
  const backup = jsonClone(store)
  try {
    const result = await queryFn(store)
    await fsp.writeFile('store.json', JSON.stringify(store, ' ', 2))
    return jsonClone(result)
  }
  catch {
    store = backup
    throw new Error('New store state must be JSON-stringifiable!')
  }
}

let store = JSON.parse(require('fs').readFileSync('store.json', 'utf8') || '{}')

module.exports = {read, update}