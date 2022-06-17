import { KR_SOURCE_FIRST, KR_SOURCE_MIDDLE, KR_SOURCE_LAST } from './types'

/**
 * 문자 초/중/종성 분리
 * @param char
 */
export function separateChar(char: string) {
  const arr: string[] = []
  const charCode = char.charCodeAt(0)
  if (charCode < 44032 || 55203 < charCode) {
    arr.push(char)
    return arr
  }
  const koCode = charCode - 44032
  const indexF = Math.floor(koCode / 28 / 21)
  const indexM = Math.floor((koCode / 28) % 21)
  const indexL = koCode % 28
  const charF = KR_SOURCE_FIRST[indexF]
  const charM = KR_SOURCE_MIDDLE[indexM]
  const charL = KR_SOURCE_LAST[indexL]
  if (charF) arr.push(charF)
  if (charM) arr.push(charM)
  if (charL) arr.push(charL)
  return arr
}

/**
 * 문자열 초/중/종성 분리
 * @param str
 */
export function separateString(str: string) {
  const arr: string[][] = []
  str.split('').forEach((char) => {
    arr.push(separateChar(char))
  })
  return arr
}
