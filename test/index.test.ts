import * as Uuid from 'uuid/v4'

import alphabet from '../src/alphabet'
import table from '../src/table'
import * as OldCrock from '../src/version1'
import * as Crock from '../src/index'

describe('Testing crock (every test is being run 200 times internally)', () => {
  it('Should have the same alphabet', () => {
    expect(alphabet).toMatchSnapshot()
  })

  it('Should have the same table', () => {
    expect(table).toMatchSnapshot()
  })

  it('Should return false for every camera mailbox UUID codec', () => {
    for (let i = 0; i < 200; ++i) {
      const uuidSrc = Uuid()
      const camera = Crock.encodeCamera(uuidSrc)
      const { isNvr, uuid } = Crock.decode10crock(camera)
      expect(isNvr).toBe(false)
      expect(uuid).toBe(uuidSrc.slice(0, 13))
    }
  })

  it('Should return true for every site mailbox UUID codec', () => {
    for (let i = 0; i < 200; ++i) {
      const uuidSrc = Uuid()
      const site = Crock.encodeSite(uuidSrc)
      const { isNvr, uuid } = Crock.decode10crock(site)
      expect(isNvr).toBe(true)
      expect(uuid).toBe(uuidSrc.slice(0, 13))
    }
  })

  it('Should check UUID of every email subject UUID codec', () => {
    for (let i = 0; i < 200; ++i) {
      const uuidSrc = Uuid()
      const subject = Crock.encodeSubject(uuidSrc)
      const { uuid } = Crock.decode6crock(subject)
      expect(uuid).toBe(uuidSrc.slice(0, 7))
    }
  })

  it('Should check if new mailbox codec behaves as old', () => {
    for (let i = 0; i < 200; ++i) {
      const uuidSrc = Uuid()
      const cameraNew = Crock.encodeCamera(uuidSrc)
      const cameraOld = OldCrock.encodeUuid(uuidSrc)
      expect(cameraNew).toBe(cameraOld)
      const { isNvr, uuid } = Crock.decode10crock(cameraNew)
      const uuidOld = OldCrock.decodeUuid(cameraNew)
      expect(isNvr).toBe(false)
      expect(uuidOld).toBe(uuid)
      expect(uuid).toBe(uuidSrc.slice(0, 13))
    }
  })
})
