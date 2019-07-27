import table from '../table'

import octetToHex from '../utils/octetToHex'

function decode(letters: string) {
  const [a, b, c, d, e, f, g, h, i, j] = [...letters].map(l => table[l])
  // const version = a >>> 3
  return [
    ((a & 7) << 5) | b,
    c << 3 | (d >>> 2),
    (d & 3) << 6 | (e << 1) | (f >>> 4),
    (f & 0xf) << 4 | g >>> 1,
    (g & 1) << 7 | h << 2 | i >>> 3,
    (i & 7) << 5 | j,
  ]
}

export default (crock: string) => {
  const uuid = octetToHex(decode(crock))
  return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}`
}
