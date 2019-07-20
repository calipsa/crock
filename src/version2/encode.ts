import alphabet from '../alphabet'

function encode7hex(version: number, hex: string) {
  let bin = Number.parseInt(hex, 16)
  let crockStr = ''
  for (let i = 0; i < 5; ++i) {
    crockStr = `${alphabet[bin & 31]}${crockStr}`
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

function encodeMailbox(uuid: string, isNvr: boolean) {
  const version = 0
  const fst12hex = `${uuid.slice(0, 8)}${uuid.slice(9, 13)}`
  const [fstHex, sndHex, ...last10hex] = fst12hex
  const last8crock = encode10hex(last10hex.join(''))
  const fst2bits = version << 1 | (+isNvr)
  const fst10bits = fst2bits << 8 | Number.parseInt(`${fstHex}${sndHex}`, 16)
  const fst5bits = fst10bits >>> 5
  const snd5bits = fst10bits & 0x1f
  return `${alphabet[fst5bits]}${alphabet[snd5bits]}${last8crock}`
}

export const encodeCamera = (uuid: string) =>
  encodeMailbox(uuid, false /* not an NVR */)

export const encodeSite = (uuid: string) =>
  encodeMailbox(uuid, true /* is an NVR */)

export function encodeSubject(uuid: string) {
  const first7hex = uuid.slice(0, 7)
  return encode7hex(0, first7hex)
}
