import { KR_SOURCE_FIRST, KR_WORD_START_AT, KR_WORD_END_AT } from './types';

export function typingMatrix(sourceStr: string) {
  const arr: string[][] = [];
  sourceStr.split('').forEach((char) => {
    arr.push(typingChar(char));
  });
  return arr;
}

export function typingChar(sourceChar: string) {
  const char = sourceChar.substring(0, 1);
  const codeAt = char.charCodeAt(0);
  const charArr: string[] = [];
  if (KR_WORD_START_AT <= codeAt && codeAt <= KR_WORD_END_AT) {
    const initialIndex = Math.floor((codeAt - KR_WORD_START_AT) / 588);
    const initialAt = initialIndex * 588 + KR_WORD_START_AT;
    const medialIndex = Math.floor((codeAt - initialAt) / 28) * 28 + initialAt;
    const medialAt = Math.floor((codeAt - initialAt) / 28);
    const finalAt = codeAt - medialIndex;
    let addMedialCode = null;
    let addFinalCode = null;

    // 초성
    charArr.push(String(KR_SOURCE_FIRST[initialIndex]));

    // 중성
    if (9 <= medialAt && medialAt <= 11) {
      addMedialCode = initialAt + 8 * 28; // ㅘ, ㅙ, ㅚ (9, 10, 11) -> add ㅗ (8)
    } else if (14 <= medialAt && medialAt <= 16) {
      addMedialCode = initialAt + 13 * 28; // ㅝ, ㅞ, ㅟ (14, 15, 16) -> add ㅜ (13)
    } else if (medialAt === 19) {
      addMedialCode = initialAt + 18 * 28; // ㅢ (19) -> add ㅡ (18)
    }
    if (addMedialCode !== null) {
      charArr.push(String.fromCharCode(addMedialCode));
    }
    charArr.push(String.fromCharCode(medialIndex));

    // 종성
    if (finalAt != 0) {
      if (2 <= finalAt && finalAt <= 3) {
        addFinalCode = medialIndex + 1; // ㄲ, ㄳ (2, 3) -> add ㄱ(1)
      } else if (5 <= finalAt && finalAt <= 6) {
        addFinalCode = medialIndex + 4; // ㄵ, ㄶ(5, 6) -> add ㄴ(4)
      } else if (9 <= finalAt && finalAt <= 15) {
        addFinalCode = medialIndex + 8; // ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ (9, 10, 11, 12, 13, 14, 15) -> add ㄹ(8)
      } else if (finalAt === 18) {
        addFinalCode = medialIndex + 17; // ㅄ (18) -> add ㅂ(17)
      }
      if (addFinalCode) {
        charArr.push(String.fromCharCode(addFinalCode));
      }
      charArr.push(char);
    }
  } else if (32 === codeAt) {
    charArr.push(' ');
  } else {
    charArr.push(String.fromCharCode(codeAt));
  }
  return charArr;
}
