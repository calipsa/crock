type WrappedFunc<Args extends any[], R> = (...args: Args) => R

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
