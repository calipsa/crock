export default (binary: number, hexLength: number) =>
  binary.toString(16).padStart(hexLength, '0')
