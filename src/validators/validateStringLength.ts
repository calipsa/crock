/**
 * Validate the first argument is a string `length` characters long.
 * Throw `Error` if not.
 */
export default (arg: any, length: number) => {
  if (typeof arg !== 'string') {
    throw new Error(`Argument should be a string. Instead got: ${arg}`)
  }

  if (arg.length !== length) {
    throw new Error(`Argument should be a string ${length} characters long. Instead got: ${arg}`)
  }
}
