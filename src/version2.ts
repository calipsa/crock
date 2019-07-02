import alphabet from './alphabet'
import getValue from './getValue'

function decodeCrock(letters: string) {
  let bin = 0
  for (const l of letters) {
    bin <<= 5
    bin |= getValue(l)
  }
  return bin
}

const decode4crockToHex = (letters: string) =>
  decodeCrock(letters).toString(16).padStart(5, '0')

const decode8crockToHex = (letters: string) =>
  `${decode4crockToHex(letters.slice(0, 4))}${decode4crockToHex(letters.slice(4, 8))}`

function encode7hex(version: number, hexs: string) {
  let bin = Number.parseInt(hexs, 16)
  let crockStr = ''
  for (let i = 0; i < 5; i++, bin >>>= 5) {
    crockStr = `${alphabet[bin & 31]}${crockStr}`
  }

  return `${alphabet[version << 3 | bin]}${crockStr}`
}

function encode5hex(hex: string) {
  let bin = Number.parseInt(hex, 16)
  let crockStr = ''
  for (let i = 0; i < 4; i++, bin >>>= 5) {
    crockStr = `${alphabet[bin & 0x1f]}${crockStr}`
  }

  return crockStr
}

const encode10hex = (hex: string) =>
  `${encode5hex(hex.slice(0, 5))}${encode5hex(hex.slice(5, 10))}`

export function encodeSubject(uuid: string) {
  const first7hex = uuid.slice(0, 7)
  return encode7hex(0, first7hex)
}

function encodeMailbox(uuid: string, isNvr: boolean) {
  const version = 0
  const fst12hex = `${uuid.slice(0, 8)}${uuid.slice(9, 13)}`
  const [fstHex, sndHex, ...last10hex] = fst12hex
  const last8crock = encode10hex(last10hex.join(''))
  const fst2bits = version << 1 | (+isNvr)
  const fst10bits = fst2bits << 8 | Number.parseInt(fstHex + sndHex, 16)
  const fst5bits = fst10bits >>> 5
  const snd5bits = fst10bits & 0x1f
  return `${alphabet[fst5bits]}${alphabet[snd5bits]}${last8crock}`
}

export const encodeCamera = (uuid: string) =>
  encodeMailbox(uuid, false /* not an NVR */)

export const encodeSite = (uuid: string) =>
  encodeMailbox(uuid, true /* is an NVR */)

/*
 * first two bits were planned for versioning, but with the new
 * NVR requirement the second bit is used as an isNvr flag leaving
 * just the first bit for versioning/reserved.
 */
export function decode10crock(crock: string) {
  if (crock.length !== 10) {
    throw new Error('unknown encoding - length different from 10 characters')
  }

  const letters = crock.toLowerCase()
  const fst5bits = getValue(letters[0])
  const reserved = fst5bits >>> 4
  if (reserved) {
    throw new Error('unknown encoding')
  }

  const snd5bits = getValue(letters[1])
  const fst8bits = (fst5bits & 7) << 5 | snd5bits
  const fst2Hex = fst8bits.toString(16).padStart(2, '0')
  const last10Hex = decode8crockToHex(letters.slice(2))

  return {
    isNvr: !!(fst5bits >>> 3 & 1),
    uuid: `${fst2Hex}${last10Hex.slice(0, 6)}-${last10Hex.slice(6)}`,
  }
}

export function decode6crock(crock: string) {
  if (crock.length !== 6) {
    throw new Error('unknown encoding - length different from 10 characters')
  }

  const letters = crock.toLowerCase()
  let bin = decodeCrock(letters)
  const version = bin >>> 28 // two first bits for version
  if (version) {
    throw new Error('unknown encoding version')
  }

  bin &= 0xfffffff
  return {
    uuid: bin.toString(16).padStart(7, '0'),
  }
}
