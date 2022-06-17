import { typingMatrix, typingChar } from '../typing';

describe('typingMatrix', () => {
  it('타이핑 순서에 맞게 행렬로 분리 되어야 합니다.', () => {
    expect(typingMatrix('끓이다.')).toEqual([
      ['ㄲ', '끄', '끌', '끓'],
      ['ㅇ', '이'],
      ['ㄷ', '다'],
      ['.'],
    ]);
  });

  test('typingMatrix - "Hello 안녕하세요!"', () => {
    expect(typingMatrix('Hello 안녕하세요!')).toEqual([
      ['H'],
      ['e'],
      ['l'],
      ['l'],
      ['o'],
      [' '],
      ['ㅇ', '아', '안'],
      ['ㄴ', '녀', '녕'],
      ['ㅎ', '하'],
      ['ㅅ', '세'],
      ['ㅇ', '요'],
      ['!'],
    ]);
  });
});

describe('typingChar', () => {
  it('타이핑 순서에 맞게 일차원 배열로 분리 되어야 합니다.', () => {
    expect(typingChar('끓')).toEqual(['ㄲ', '끄', '끌', '끓']);
  });
  it('문자열을 넣는 경우 첫 문자만 분리 되어야 합니다.', () => {
    expect(typingChar('첫글자')).toEqual(['ㅊ', '처', '첫']);
  });
  test('typingChar - "왜"', () => {
    expect(typingChar('왜')).toEqual(['ㅇ', '오', '왜']);
  });
  test('typingChar - "왜"', () => {
    expect(typingChar('왜')).toEqual(['ㅇ', '오', '왜']);
  });
  test('typingChar - "외"', () => {
    expect(typingChar('외')).toEqual(['ㅇ', '오', '외']);
  });
  test('typingChar - "위"', () => {
    expect(typingChar('위')).toEqual(['ㅇ', '우', '위']);
  });
  test('typingChar - "의"', () => {
    expect(typingChar('의')).toEqual(['ㅇ', '으', '의']);
  });
  test('typingChar - "깞"', () => {
    expect(typingChar('깞')).toEqual(['ㄲ', '까', '깝', '깞']);
  });
  test('typingChar - "밝"', () => {
    expect(typingChar('밝')).toEqual(['ㅂ', '바', '발', '밝']);
  });
  test('typingChar - "싸"', () => {
    expect(typingChar('싸')).toEqual(['ㅆ', '싸']);
  });
  test('typingChar - "갔"', () => {
    expect(typingChar('갔')).toEqual(['ㄱ', '가', '갔']);
  });
  test('typingChar - "앉"', () => {
    expect(typingChar('앉')).toEqual(['ㅇ', '아', '안', '앉']);
  });
  test('typingChar - "A"', () => {
    expect(typingChar('A')).toEqual(['A']);
  });
  test('typingChar - "!"', () => {
    expect(typingChar('!')).toEqual(['!']);
  });
  test('typingChar - "ㄱ"', () => {
    expect(typingChar('ㄱ')).toEqual(['ㄱ']);
  });
  test('typingChar - " "', () => {
    expect(typingChar(' ')).toEqual([' ']);
  });
});
