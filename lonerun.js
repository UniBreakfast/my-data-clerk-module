
const { addArr, direct } = require('.'),
      { read, update } = direct,
      { assign } = Object,
      c = console.log

assign(global, {c, addArr, direct})

setTimeout(c, 1e7)