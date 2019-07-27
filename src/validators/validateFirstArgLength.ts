import identity from '../utils/identity'
import validate from './validate'

/**
 * Validate the first argument is a string `length` characters long.
 * Throw `Error` if not.
 */
export default <F extends (first: string, ...args: any[]) => any>(
  func: F,
  length: number,
): F =>
  // @ts-ignore
  validate(
    func,
    (firstArg) => firstArg.length === length,
    `string ${length} characters long`,
    identity,
  )
