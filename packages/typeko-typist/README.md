# @jood/typeko-typist

## ManualTyping

### Example

```typescript
import { typingMatrix } from '@jood/typeko-core';

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
```

### observe()

입력 타이핑에 대한 이벤트를 구독할 수 있습니다.

### start()

입력 타이핑을 시작 합니다.

### pause()

입력 타이핑을 중지 합니다.

### resume()

입력 타이핑을 재개 합니다.

### getState()

입력기의 현재 상태를 알 수 있습니다.

### setSourceMatrix(source)

입력기의 문자 소스를 지정합니다.

- source: 타이핑 될 문자 배열 - @jood/typeko-core 참고

### setTypingSpeed(min, max)

입력기의 1회의 타이핑 속도를 지정합니다.

- min: 최소 시간(ms)
- max: 최대 시간(ms)

### getTypingSpeed()

1회의 타이핑 속도를 지정된 min 부터 max 사이의 값을 반환합니다.

### addDelayByEqual()

타이핑 진행시 지정된 char 와 일치할 때 delay 시간 만큼 늦춥니다.

- char: 매칭 문자
- delay: 늦출 시간(ms)

### removeDelayByEqual()

delayByEqual 에 등록된 정보 중 char 에 해당 하는 정보를 제거 합니다.

- char: 매칭 문자
