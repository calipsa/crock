import * as Uuid from 'uuid/v4'

import alphabet from '../src/alphabet'
import table from '../src/table'

import hexToOctet from '../src/utils/hexToOctet'
import octetToHex from '../src/utils/octetToHex'

import * as OldCrock from '../src/v1'
import * as Crock from '../src/index'

const generateHex = (len: number) =>
  Math.random()
    .toString(16)
    .slice(2, len + 2)
    .padStart(len, '0')

describe('Testing crock', () => {
  it('Should have the same alphabet', () => {
    expect(alphabet).toMatchSnapshot()
  })

  it('Should have the same table', () => {
    expect(table).toMatchSnapshot()
  })

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

    expect(() => Crock.decode10crock('bad_encodi')).toThrowErrorMatchingSnapshot()
    expect(() => Crock.decode6crock('bad_en')).toThrowErrorMatchingSnapshot()
  })

  it('Should convert hex to octet & back', () => {
    const hexes = [
      '',
      '00',
      '0000',
      '00000000',
    ]
    for (let i = 0; i < 200; ++i) {
      const hex = generateHex(8)
      hexes.push(hex)
    }
    for (const hex of hexes) {
      const octet = hexToOctet(hex)
      const hex2 = octetToHex(octet)
      expect(hex2).toBe(hex)
    }
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
