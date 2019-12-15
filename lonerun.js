
const { read, update } = require('.')

update(obj => obj.arr.push(obj.arr.length+1))

result = read(obj => obj.arr)
console.log(result.toString())