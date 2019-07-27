import table from '../table'

import validateFirstArgLength from '../validators/validateFirstArgLength'
import validateFirstArgCorrectEncoding from '../validators/validateFirstArgCorrectEncoding'

function decodeCrock(letters: string) {
  let bin = 0
  for (const l of letters) {
    bin <<= 5
    bin |= table[l]
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
function decode10crockUnvalidated(crock: string) {
  const letters = crock.toLowerCase()
  const fst5bits = table[letters[0]]
  const reserved = fst5bits >>> 4
  if (reserved) {
    throw new Error('unknown encoding')
  }

  const snd5bits = table[letters[1]]
  const fst8bits = (fst5bits & 7) << 5 | snd5bits
  const fst2Hex = fst8bits.toString(16).padStart(2, '0')
  const last10Hex = decode8crockToHex(letters.slice(2))

  return {
    isNvr: !!(fst5bits >>> 3 & 1),
    uuid: `${fst2Hex}${last10Hex.slice(0, 6)}-${last10Hex.slice(6)}`,
  }
}

function decode6crockUnvalidated(crock: string) {
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
export const decode10crock = validateFirstArgLength(
  validateFirstArgCorrectEncoding(decode10crockUnvalidated),
  10,
)

export const decode6crock = validateFirstArgLength(
  validateFirstArgCorrectEncoding(decode6crockUnvalidated),
  6,
)
