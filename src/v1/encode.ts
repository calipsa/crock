import alphabet from '../alphabet'

import hexToOctet from '../utils/hexToOctet'

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

export default (uuid: string) => {
  const first48bits = `${uuid.slice(0, 8)}${uuid.slice(9, 13)}`
  const octetList = hexToOctet(first48bits)
  return encode(0, octetList)
}
