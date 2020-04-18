import binToHex from './binToHex'

const binToHex2 = (i: number) =>
  binToHex(i, 2)

export default (list: readonly number[]) =>
  list.map(binToHex2).join('')
