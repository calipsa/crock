/*
 * quicker or slower?
 */
// function octetToHex(list: number[]) {
//   const hex = []
//   for (const o of list) {
//     let hexPair = o.toString(16)
//     if (hexPair.length < 2) {
//       hexPair = `0${hexPair}`
//     }
//     hex.push(hexPair)
//   }
//   return hex.join('')
// }

export default (list: readonly number[]) => {
  const nums: number[] = []
  for (const o of list) {
    nums.push(
      o >>> 4,
      o & 0xf,
    )
  }
  return nums.map(i => i.toString(16)).join('')
}
