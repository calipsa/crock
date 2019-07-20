import getValue from '../getValue'

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
    throw new Error('unknown encoding - length different from 6 characters')
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
