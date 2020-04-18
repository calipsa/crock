const RE = /.{1,2}/g

const hexToInt = (hex: string) =>
  Number.parseInt(hex, 16)

export default (hex: string) =>
  (hex.match(RE) ?? []).map(hexToInt)
