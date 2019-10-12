import table from '../data/table'

const letterIsAbsent = (letter: string) =>
  !table.hasOwnProperty(letter.toLowerCase())

const lettersAsString = (letters: readonly string[]) =>
  letters.map(letter => `"${letter}"`).join(', ')

/**
 * Validate the first argument is a string `length` characters long.
 * Throw `Error` if not.
 */
export default (arg: any) => {
  if (typeof arg !== 'string') {
    throw new Error(`Argument should be a string. Instead got: ${arg}`)
  }

  const badLetters = [...arg].filter(letterIsAbsent)
  if (badLetters.length) {
    throw new Error(`Unknown encoding. Bad letters: ${lettersAsString(badLetters)}`)
  }
}
