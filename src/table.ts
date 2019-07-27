import alphabet from './alphabet'

// tslint:disable-next-line:interface-over-type-literal
type Table = {
  [letter: string]: number,
}

const alias: Table = {
  o: 0,
  i: 1,
  l: 1,
}

const table: Table = {}
// Invert 'alphabet'
for (let i = 0; i < alphabet.length; ++i) {
  const letter = alphabet[i]
  table[letter] = i
}

export default Object.freeze({
  ...table,
  ...alias,
})
