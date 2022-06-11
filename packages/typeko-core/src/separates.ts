import { SOURCE_FIRST, SOURCE_MIDDLE, SOURCE_LAST } from './types';

export function separateChar(char: string) {
  const arr: string[] = [];
  const charCode = char.charCodeAt(0);
  if (charCode < 44032 || 55203 < charCode) {
    arr.push(char);
    return arr;
  }
  const koCode = charCode - 44032;
  const indexF = Math.floor(koCode / 28 / 21);
  const indexM = Math.floor((koCode / 28) % 21);
  const indexL = koCode % 28;
  const charF = SOURCE_FIRST[indexF];
  const charM = SOURCE_MIDDLE[indexM];
  const charL = SOURCE_LAST[indexL];
  if (charF) arr.push(charF);
  if (charM) arr.push(charM);
  if (charL) arr.push(charL);
  return arr;
}

export function separateString(str: string) {
  const arr: string[][] = [];
  str.split('').forEach((char) => {
    arr.push(separateChar(char));
  });
  return arr;
}
