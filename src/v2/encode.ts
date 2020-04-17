import alphabet from '../data/alphabet'
import validateUuid from '../validators/validateUuid'

function encode7hex(hex: string, version: number) {
  let bin = Number.parseInt(hex, 16)
  let crockStr = ''
  for (let i = 0; i < 5; ++i) {
    crockStr = `${alphabet[bin & 0x1f]}${crockStr}`
    bin >>>= 5
  }

  return `${alphabet[version << 3 | bin]}${crockStr}`
}

function encode5hex(hex: string) {
  let bin = Number.parseInt(hex, 16)
  let crockStr = ''
  for (let i = 0; i < 4; ++i) {
    crockStr = `${alphabet[bin & 0x1f]}${crockStr}`
    bin >>>= 5
  }

  return crockStr
}

const encode10hex = (hex: string) =>
  `${encode5hex(hex.slice(0, 5))}${encode5hex(hex.slice(5, 10))}`

function encode12hex(hex: string, isNvr: boolean, version: number) {
  const fst2hex = hex.slice(0, 2)
  const last10hex = hex.slice(2)
  const last8crock = encode10hex(last10hex)
  const fst2bits = version << 1 | (+isNvr)
  const fst10bits = fst2bits << 8 | Number.parseInt(fst2hex, 16)
  const fst5bits = fst10bits >>> 5
  const snd5bits = fst10bits & 0x1f
  return `${alphabet[fst5bits]}${alphabet[snd5bits]}${last8crock}`
}

function encodeMailbox(uuid: string, isNvr: boolean) {
  const fst12hex = `${uuid.slice(0, 8)}${uuid.slice(9, 13)}`
  return encode12hex(fst12hex, isNvr, 0)
}

export function encodeCamera(uuid: string) {
  validateUuid(uuid)
  return encodeMailbox(uuid, false /* not an NVR */)
}

export function encodeSite(uuid: string) {
  validateUuid(uuid)
  return encodeMailbox(uuid, true /* is an NVR */)
}

export function encodeSubject(uuid: string) {
  validateUuid(uuid)
  const first7hex = uuid.slice(0, 7)
  return encode7hex(first7hex, 0)
}
