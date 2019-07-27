import binToHex from '../src/utils/binToHex'
import hexToOctet from '../src/utils/hexToOctet'
import octetToHex from '../src/utils/octetToHex'

const generateHex = (len: number) =>
  Math.random()
    .toString(16)
    .slice(2, len + 2)
    .padStart(len, '0')

describe('Testing utils', () => {
  it('Should correctly convert bin to hex', () => {
    const numbers = [
      0,
      1,
      0xffffffffff,
    ]
    for (let i = 0; i < 200; ++i) {
      const num = Number.parseInt(Math.random().toString(16).slice(2, 10), 16)
      numbers.push(num)
    }
    for (const n of numbers) {
      const hex = binToHex(n, 8)
      const n2 = Number.parseInt(hex, 16)
      expect(n2).toBe(n)
    }
  })

  it('Should convert hex to octet & back', () => {
    const hexes = [
      '',
      '00',
      '0000',
      '00000000',
    ]
    for (let i = 0; i < 200; ++i) {
      const hex = generateHex(8)
      hexes.push(hex)
    }
    for (const hex of hexes) {
      const octet = hexToOctet(hex)
      const hex2 = octetToHex(octet)
      expect(hex2).toBe(hex)
    }
  })
})
