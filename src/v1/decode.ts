import table from '../table'

/*
 * quicker or slower?
 */
/*
function octetToHex (list) {
  const hex = []
  for (let o of list) {
    let hexPair = o.toString(16)
    if (hexPair.length < 2)
      hexPair = '0' + hexPair
    hex.push(hexPair)
  }
  return hex.join('')
}
*/

function octetToHex(list: number[]) {
  const hex: string[] = []
  for (const o of list) {
    const pair = [o >>> 4, o & 0xf].map(v => v.toString(16))
    hex.push(...pair)
  }
  return hex.join('')
}

function decode(letters: string) {
  const values: number[] = []
  for (const l of letters) {
    values.push(table[l])
  }
  const [a, b, c, d, e, f, g, h, i, j] = values
  // const version = a >>> 3
  const bytes = [
    ((a & 7) << 5) | b,
    c << 3 | (d >>> 2),
    (d & 3) << 6 | (e << 1) | (f >>> 4),
    (f & 0xf) << 4 | g >>> 1,
    (g & 1) << 7 | h << 2 | i >>> 3,
    (i & 7) << 5 | j,
  ]
  return bytes
}

export function decodeUuid(crock: string) {
  const uuid = octetToHex(decode(crock))
  return `${uuid.substring(0, 8)}-${uuid.substring(8, 12)}`
}
