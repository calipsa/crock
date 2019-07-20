import alphabet from './alphabet'

// tslint:disable-next-line:interface-over-type-literal
type Table = {
  [letter: string]: number,
}

const alias = {
  o: 0,
  i: 1,
  l: 1,
}

const table: Table = {}
// Invert 'alphabet'
let i = 0
for (const letter of alphabet) {
  table[letter] = i++
}
// Splice in 'alias'
for (const [key, val] of Object.entries(alias)) {
  table[key] = table[val]
}

export default Object.freeze(table)
