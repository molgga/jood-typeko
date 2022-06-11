import { separateChar } from '../separates';

describe('separateChar', () => {
  it('초/중/종성이 분리된 1차원 배열로 반환 되어야 합니다.', () => {
    expect(separateChar('뚱')).toEqual(['ㄸ', 'ㅜ', 'ㅇ']);
  });

  it('종성이 없는 경우 초/중성만 분리된 길이 2의 배열로 반환 되어야 합니다.', () => {
    expect(separateChar('뚜')).toEqual(['ㄸ', 'ㅜ']);
  });
});
