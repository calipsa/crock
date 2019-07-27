import table from '../data/table'
import identity from '../utils/identity'
import validate from './validate'

const firstArgIsCorrectEncoding = (firstArg: string) =>
  [...firstArg].every(l => table.hasOwnProperty(l.toLowerCase()))

/**
 * Validate the first argument is a string `length` characters long.
 * Throw `Error` if not.
 */
export default <F extends (first: string, ...args: any[]) => any>(
  func: F,
): F =>
  // @ts-ignore
  validate(
    func,
    firstArgIsCorrectEncoding,
    'correctly encoded string',
    identity,
  )
