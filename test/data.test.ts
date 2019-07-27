import alphabet from '../src/data/alphabet'
import table from '../src/data/table'

describe('Testing data', () => {
  it('Should have the same alphabet', () => {
    expect(alphabet).toMatchSnapshot()
  })

  it('Should have the same table', () => {
    expect(table).toMatchSnapshot()
  })
})
