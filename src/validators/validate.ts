type WrappedFunc<Args extends any[], R> = (...args: Args) => R

/**
 * Validate the function arguments & throw error if the validation fails
 */
export default <Args extends any[], R>(
  func: WrappedFunc<Args, R>,
  validator: (...args: Args) => boolean,
  expectedValueMessage: string,
  gotMessage: (...args: Args) => string,
): WrappedFunc<Args, R> =>
  (...args: Args) => {
    if (!validator(...args)) {
      throw new Error(`Expected: ${expectedValueMessage}. Got: ${gotMessage(...args)}`)
    }
    return func(...args)
  }
