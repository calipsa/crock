import alphabet from '../alphabet'

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

export function encodeUuid(uuid: string) {
  const first48bits = `${uuid.substring(0, 8)}${uuid.substring(9, 13)}`
  const octetList = hexToOctet(first48bits)
  return encode(0, octetList)
}
