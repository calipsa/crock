module.exports = {
  verbose: true,
  modulePaths: [
    '<rootDir>',
  ],
  moduleFileExtensions: [
    'js',
    'json',
  ],
  transform: {
    '\\.js$': '<rootDir>/node_modules/babel-jest',
  },
}
