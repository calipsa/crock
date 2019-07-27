import table from './table'

export default (letter: string) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!table.hasOwnProperty(letter)) {
    throw new Error(`invalid encoding: "${letter}"`)
  }
  return table[letter]
}
