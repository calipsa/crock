import * as isUUID from 'validator/lib/isUUID'

/**
 * Validate the first argument is a valid UUID.
 * Throw `Error` if not.
 */
export default (arg: any) => {
  if (!isUUID(arg)) {
    throw new Error(`Argument should be a UUID. Instead got: ${arg}`)
  }
}
