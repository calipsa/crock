/*
 * https://en.wikipedia.org/wiki/Email_box#Mailbox_names
 * https://en.wikipedia.org/wiki/Universally_unique_identifier#Format
 * https://en.wikipedia.org/wiki/Base32
 * http://www.crockford.com/wrmg/base32.html
 * https://github.com/latentflip/base32-crockford-browser/blob/master/lib/base32.js
 */

import table from './table'

export default (letter: string) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!table.hasOwnProperty(letter)) {
    throw new Error(`invalid encoding: "${letter}"`)
  }
  return table[letter]
}
