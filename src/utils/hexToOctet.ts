export default (hex: string) => {
  const byteList: number[] = []
  for (let i = hex.length; i > 0; i -= 2) {
    const hexPair = hex.substring(i - 2, i)
    const octet = Number.parseInt(hexPair, 16)
    byteList.push(octet)
  }
  return byteList.reverse()
}
