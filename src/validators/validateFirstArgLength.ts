import identity from '../utils/identity'
import validate from './validate'

export default <F extends (first: string, ...args: any[]) => any>(
  func: F,
  length: number,
): F =>
  // @ts-ignore
  validate(
    func,
    (firstArg, ...rest) => firstArg.length === length,
    `string ${length} characters long`,
    identity,
  )
