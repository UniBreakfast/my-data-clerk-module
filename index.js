
const {read, update} = require('./store/fsDirect'),
// fsDirect | fsDirectSync | inMem | inMemSync

addArr = async (...names)=>
  await update(store => names.forEach(name => store[name] = store[name] || []))


module.exports = {direct: {read, update}, addArr}