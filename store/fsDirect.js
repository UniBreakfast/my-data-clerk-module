
const
fsp = require('fs').promises,

read = async queryFn =>
  await queryFn(JSON.parse(await fsp.readFile('store.json', 'utf8') || '{}')),

update = async queryFn => {
  const file = await fsp.readFile('store.json', 'utf8') || '{}',
        store = JSON.parse(file)
  try {
    const result = await queryFn(store),
          json = JSON.stringify(store, ' ', 2)
    if (file != json) await fsp.writeFile('store.json', json)
    return result
  }
  catch {
    throw new Error('New store state must be JSON-stringifiable!')
  }
}

module.exports = {read, update}