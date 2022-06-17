import { typingMatrix, typingToken } from '../typing';

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

describe('typingToken', () => {
  it('타이핑 순서에 맞게 일차원 배열로 분리 되어야 합니다.', () => {
    expect(typingToken('끓')).toEqual(['ㄲ', '끄', '끌', '끓']);
  });
  it('문자열을 넣는 경우 첫 문자만 분리 되어야 합니다.', () => {
    expect(typingToken('첫글자')).toEqual(['ㅊ', '처', '첫']);
  });
  test('typingToken - "왜"', () => {
    expect(typingToken('왜')).toEqual(['ㅇ', '오', '왜']);
  });
  test('typingToken - "왜"', () => {
    expect(typingToken('왜')).toEqual(['ㅇ', '오', '왜']);
  });
  test('typingToken - "외"', () => {
    expect(typingToken('외')).toEqual(['ㅇ', '오', '외']);
  });
  test('typingToken - "위"', () => {
    expect(typingToken('위')).toEqual(['ㅇ', '우', '위']);
  });
  test('typingToken - "의"', () => {
    expect(typingToken('의')).toEqual(['ㅇ', '으', '의']);
  });
  test('typingToken - "깞"', () => {
    expect(typingToken('깞')).toEqual(['ㄲ', '까', '깝', '깞']);
  });
  test('typingToken - "밝"', () => {
    expect(typingToken('밝')).toEqual(['ㅂ', '바', '발', '밝']);
  });
  test('typingToken - "싸"', () => {
    expect(typingToken('싸')).toEqual(['ㅆ', '싸']);
  });
  test('typingToken - "갔"', () => {
    expect(typingToken('갔')).toEqual(['ㄱ', '가', '갔']);
  });
  test('typingToken - "앉"', () => {
    expect(typingToken('앉')).toEqual(['ㅇ', '아', '안', '앉']);
  });
  test('typingToken - "A"', () => {
    expect(typingToken('A')).toEqual(['A']);
  });
  test('typingToken - "!"', () => {
    expect(typingToken('!')).toEqual(['!']);
  });
  test('typingToken - "ㄱ"', () => {
    expect(typingToken('ㄱ')).toEqual(['ㄱ']);
  });
  test('typingToken - " "', () => {
    expect(typingToken(' ')).toEqual([' ']);
  });
});
