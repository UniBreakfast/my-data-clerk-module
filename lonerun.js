
const { read, update } = require('.'),


main = async ()=> {
  await update(store => store.arr.push(store.arr.length+1))

  let result = await read(store => store.arr)
  console.log(result.toString())
}

main()