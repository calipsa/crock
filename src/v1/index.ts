import alphabet from '../alphabet'
import table from '../table'

function hexToOctet(hex: string) {
  const byteList: number[] = []
  const len = hex.length
  for (let i = 0; i < len; i += 2) {
    const hexPair = hex.substring(i, i + 2)
    const octet = Number.parseInt(hexPair, 16)
    byteList.push(octet)
  }
  return byteList
}

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

function encode(version: number, [a, b, c, d, e, f]: number[]) {
  const values = [
    (version << 3) | (a >>> 5),
    a & 0x1f,
    b >>> 3,
    (b & 7) << 2 | (c >>> 6),
    (c >>> 1) & 0x1f,
    (c & 1) << 4 | (d >>> 4),
    (d & 0xf) << 1 | (e >>> 7),
    (e >>> 2) & 0x1f,
    (e & 3) << 3 | (f >>> 5),
    f & 0x1f,
  ]
  return values
    .map(value => alphabet[value])
    .join('')
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

export function encodeUuid(uuid: string) {
  const first48bits = `${uuid.substring(0, 8)}${uuid.substring(9, 13)}`
  const octetList = hexToOctet(first48bits)
  return encode(0, octetList)
}

export function decodeUuid(crock: string) {
  const uuid = octetToHex(decode(crock))
  return `${uuid.substring(0, 8)}-${uuid.substring(8, 12)}`
}
