import * as Uuid from 'uuid/v4'

import * as OldCrock from '../src/v1'
import * as Crock from '../src/index'

describe('Testing crock', () => {
  it('Should throw on bad UUID argument', () => {
    const badUuid = 'foobarbaz'
    expect(() => Crock.encodeCamera(badUuid)).toThrowErrorMatchingSnapshot()
    expect(() => Crock.encodeSite(badUuid)).toThrowErrorMatchingSnapshot()
    expect(() => Crock.encodeSubject(badUuid)).toThrowErrorMatchingSnapshot()
  })

  it('Should throw on bad string length argument', () => {
    expect(() => Crock.decode10crock('not10characters&badenc')).toThrowErrorMatchingSnapshot()
    expect(() => Crock.decode6crock('not6characters&badenc')).toThrowErrorMatchingSnapshot()

    expect(() => Crock.decode10crock('not10characters')).toThrowErrorMatchingSnapshot()
    expect(() => Crock.decode6crock('not6characters')).toThrowErrorMatchingSnapshot()

    expect(() => Crock.decode10crock('bad_encod+')).toThrowErrorMatchingSnapshot()
    expect(() => Crock.decode6crock('bad_e$')).toThrowErrorMatchingSnapshot()
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
