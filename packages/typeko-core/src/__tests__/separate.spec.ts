import { separateChar, separateString } from '../separate'

describe('separateChar', () => {
  it('초/중/종성이 분리된 1차원 배열로 반환 되어야 합니다.', () => {
    expect(separateChar('뚱')).toEqual(['ㄸ', 'ㅜ', 'ㅇ'])
  })

  it('종성이 없는 경우 초/중성만 분리된 길이 2의 배열로 반환 되어야 합니다.', () => {
    expect(separateChar('뚜')).toEqual(['ㄸ', 'ㅜ'])
  })

  it('한글이 아닌 문자는 문자 그대로 배열로 반환 되어야 합니다.', () => {
    expect(separateChar('A')).toEqual(['A'])
    expect(separateChar('!')).toEqual(['!'])
    expect(separateChar('9')).toEqual(['9'])
    expect(separateChar(' ')).toEqual([' '])
  })

  test('separateChar - "밟"', () => {
    expect(separateChar('밟')).toEqual(['ㅂ', 'ㅏ', 'ㄼ'])
  })

  test('separateChar - "깡"', () => {
    expect(separateChar('깡')).toEqual(['ㄲ', 'ㅏ', 'ㅇ'])
  })

  test('separateChar - "A"', () => {
    expect(separateChar('A')).toEqual(['A'])
  })

  test('separateChar - "!"', () => {
    expect(separateChar('!')).toEqual(['!'])
  })

  test('separateChar - " "', () => {
    expect(separateChar(' ')).toEqual([' '])
  })

  test('separateChar - "ㅂ"', () => {
    expect(separateChar('ㅂ')).toEqual(['ㅂ'])
  })

  test('separateChar - "ㅠ"', () => {
    expect(separateChar('ㅠ')).toEqual(['ㅠ'])
  })
})

describe('separateString', () => {
  it('초/중/종성이 분리된 2차원 배열로 반환 되어야 합니다.', () => {
    expect(separateString('우리집 Cat 방울이~')).toEqual([
      ['ㅇ', 'ㅜ'],
      ['ㄹ', 'ㅣ'],
      ['ㅈ', 'ㅣ', 'ㅂ'],
      [' '],
      ['C'],
      ['a'],
      ['t'],
      [' '],
      ['ㅂ', 'ㅏ', 'ㅇ'],
      ['ㅇ', 'ㅜ', 'ㄹ'],
      ['ㅇ', 'ㅣ'],
      ['~'],
    ])
  })
})
