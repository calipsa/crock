import * as isUUID from 'validator/lib/isUUID'

import identity from '../utils/identity'
import validate from './validate'

const firstArgIsUuid = (firstArg: string) =>
  isUUID(firstArg)

/**
 * Validate the first argument is a valid UUID.
 * Throw `Error` if not.
 */
export default <F extends (first: string, ...args: any[]) => any>(
  func: F,
): F =>
  // @ts-ignore
  validate(
    func,
    firstArgIsUuid,
    'a valid UUID',
    identity,
  )
