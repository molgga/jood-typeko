# @jood/typeko-core

> 한글 초/중/종성 분리

## characterToken

초/중/종성을 분리한다.

| function       | source | result               |
| -------------- | ------ | -------------------- |
| characterToken | 푸     | [ "ㅍ", "ㅜ" ]       |
| characterToken | 밟     | [ "ㅂ", "ㅏ", "ㄼ" ] |
| characterToken | 꿍     | [ "ㄲ", "ㅜ", "ㅇ" ] |
| characterToken | 의     | [ "ㅇ", "ㅢ" ]       |
| characterToken | 왜     | [ "ㅇ", "ㅙ" ]       |

## typingToken

초/중/종성을 타이핑 순서로 분리한다.

| function    | source | result                     |
| ----------- | ------ | -------------------------- |
| typingToken | 푸     | [ "ㅍ", "푸" ]             |
| typingToken | 밟     | [ "ㅂ", "바", "발", "밟" ] |
| typingToken | 꿍     | [ "ㄲ", "꾸", "꿍" ]       |
| typingToken | 의     | [ "ㅇ", "으", "의" ]       |
| typingToken | 왜     | [ "ㅇ", "오", "왜" ]       |

## characterMatrix

초/중/종성을 분리한다.

| function        | source             |
| --------------- | ------------------ |
| characterMatrix | 안녕하세요! Hello~ |
| characterMatrix | 의자가 낡았네요.   |

```
[
  [ "ㅇ", "ㅏ", "ㄴ" ],
  [ "ㄴ", "ㅕ", "ㅇ" ],
  [ "ㅎ", "ㅏ" ],
  [ "ㅅ", "ㅔ" ],
  [ "ㅇ", "ㅛ" ],
  [ "!" ],
  [ " " ],
  [ "H" ],
  [ "e" ],
  [ "l" ],
  [ "l" ],
  [ "o" ],
  [ "~" ]
]
```

```
[
  [ "ㅇ", "ㅢ" ],
  [ "ㅈ", "ㅏ" ],
  [ "ㄱ", "ㅏ" ],
  [ " " ],
  [ "ㄴ", "ㅏ", "ㄺ" ],
  [ "ㅇ", "ㅏ", "ㅆ" ],
  [ "ㄴ", "ㅔ" ],
  [ "ㅇ", "ㅛ" ],
  [ "." ]
]
```

## typingMatrix

초/중/종성을 타이핑 순서로 분리한다.

| function     | source             |
| ------------ | ------------------ |
| typingMatrix | 안녕하세요! Hello~ |
| typingMatrix | 의자가 낡았네요.   |

```
[
  [ "ㅇ", "아", "안" ],
  [ "ㄴ", "녀", "녕" ],
  [ "ㅎ", "하" ],
  [ "ㅅ", "세" ],
  [ "ㅇ", "요" ],
  [ "!" ],
  [ " " ],
  [ "H" ],
  [ "e" ],
  [ "l" ],
  [ "l" ],
  [ "o" ],
  [ "~" ]
]
```

```
[
  [ "ㅇ", "으", "의" ],
  [ "ㅈ", "자" ],
  [ "ㄱ", "가" ],
  [ " " ],
  [ "ㄴ", "나", "날", "낡" ],
  [ "ㅇ", "아", "았" ],
  [ "ㄴ", "네" ],
  [ "ㅇ", "요" ],
  [ "." ]
]
```

---

# @jood/typeko-typist

> 문자(한글) 입력기

## ManualTypist

```typescript
const source = `안녕하세요. 반갑습니다 😎
가끔 필요할때가 있어서 만들어 봅니다.
하하하 쓸 말이 없군요. 안뇽~`;

const manual = new ManualTypist();
manual.observe().subscribe((evt) => {
  console.log(evt);
});
manual.setSourceMatrix(typingMatrix(source));
manual.setTypingSpeed(30, 40);
manual.addDelayByEqual('\n', 120);
manual.addDelayByEqual('.', 100);
manual.start();
// manual.pause();
// manual.resume();
// manual.destroy();
```
