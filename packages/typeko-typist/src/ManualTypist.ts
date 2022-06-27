import { Subject } from 'rxjs';
import { TypistEvent, TypistEventType, DelayEqual } from './types';
import { delay } from './utils';

/**
 * 수동 타이핑 입력기
 */
export class ManualTypist {
  private sourceMatrix: string[][];
  private sourceTypingTotal = 0;
  private sourceFinished = '';
  private sourceOutput = '';
  private output = '';
  private processId: number = null;
  private subject: Subject<TypistEvent>;
  private indexRow = 0;
  private indexColumn = 0;
  private indexTyping = 0;
  private speedMin = 0;
  private speedMax = 100;
  private delayByEquals: DelayEqual[] = [];
  private isPaused = false;

  constructor() {
    this.subject = new Subject();
  }

  /**
   * 옵저버
   */
  observe() {
    return this.subject.asObservable();
  }

  /**
   * 상태값
   */
  getState() {
    return {
      sourceMatrix: this.sourceMatrix,
      sourceTypingTotal: this.sourceTypingTotal,
      sourceFinished: this.sourceFinished,
      sourceOutput: this.sourceOutput,
      indexRow: this.indexRow,
      indexColumn: this.indexColumn,
      indexTyping: this.indexTyping,
      speedMin: this.speedMin,
      speedMax: this.speedMax,
      delayByEquals: this.delayByEquals,
      processId: this.processId,
      isPaused: this.isPaused,
    };
  }

  /**
   * 타이핑 될 문자 소스를 지정합니다.
   * @param source 타이핑 될 문자 배열
   */
  setSourceMatrix(source: string[][]) {
    this.sourceMatrix = source;
    this.sourceFinished = source
      .map((row) => row[row.length - 1])
      .flat()
      .join('');
    this.sourceTypingTotal = source.flat().length;
  }

  /**
   * 1회의 타이핑 속도를 지정합니다.
   * @param min 최소 시간(ms)
   * @param max 최대 시간(ms)
   */
  setTypingSpeed(min = 0, max = 0) {
    this.speedMin = Math.min(min, max);
    this.speedMax = Math.max(min, max);
  }

  /**
   * 1회의 타이핑 속도를 지정된 min 부터 max 사이의 값을 반환합니다.
   */
  getTypingSpeed() {
    return Math.random() * this.speedMax + this.speedMin;
  }

  /**
   * 타이핑 진행시 지정된 char 와 일치할 때 delay 시간 만큼 늦춥니다.
   * @param char 매칭 문자
   * @param delay 늦출 시간(ms)
   */
  addDelayByEqual(char: string, delay: number) {
    const delayEqual = this.findDelayByEqual(char);
    if (!delayEqual) {
      this.delayByEquals.push({ char, delay });
    }
  }

  /**
   * delayByEqual 에 등록된 정보 중 char 에 해당 하는 정보를 제거 합니다.
   * @param char 매칭 문자
   */
  removeDelayByEqual(char: string) {
    const index = this.findIndexDelayByEqual(char);
    if (0 < index) {
      this.delayByEquals.splice(index, 1);
    }
  }

  /**
   * delayByEqual 에 등록된 정보를 찾습니다.
   * @param char 찾을 문자
   */
  findDelayByEqual(char: string) {
    return this.delayByEquals.find((v) => v.char === char);
  }

  /**
   * delayByEqual 에 등록된 정보의 index 를 찾습니다.
   * @param char
   */
  findIndexDelayByEqual(char: string) {
    return this.delayByEquals.findIndex((v) => v.char === char);
  }

  /**
   * 1회의 타이핑을 진행합니다.
   */
  private async next(processId: number) {
    const columns = this.sourceMatrix[this.indexRow];
    const columnsLen = columns.length;
    const char = columns[this.indexColumn];
    const delayEqual = this.findDelayByEqual(char);
    await delay(this.getTypingSpeed());
    if (this.processId !== processId) return; // 재시작을 하는 경우와 같이 processId 가 변경된 경우 진행을 막는다.

    this.output += char;
    this.indexTyping++;
    this.dispatchType(TypistEventType.OUT_PUT);
    if (delayEqual) {
      await delay(delayEqual.delay);
    }

    if (this.processId !== processId) return;
    if (this.indexColumn < columnsLen - 1) {
      this.output = this.output.substring(0, this.output.length - 1);
      this.indexColumn++;
    } else {
      this.indexRow++;
      this.indexColumn = 0;
    }
    if (this.sourceMatrix.length <= this.indexRow) {
      this.dispatchType(TypistEventType.FINISHED);
    } else {
      if (!this.isPaused) {
        this.next(processId);
      }
    }
  }

  /**
   * 타이핑시 이벤트를 전파합니다.
   */
  private dispatchType(type: TypistEventType) {
    this.sourceOutput = this.output;
    this.subject.next({
      type,
      value: this.output,
      rowIndex: this.indexRow,
      columnIndex: this.indexColumn,
      typingIndex: this.indexTyping,
      typingTotal: this.sourceTypingTotal,
    });
  }

  /**
   * 타이핑을 시작합니다.
   */
  start() {
    this.isPaused = false;
    this.indexRow = 0;
    this.indexColumn = 0;
    this.indexTyping = 0;
    this.output = '';
    this.processId++;
    this.next(this.processId);
  }

  /**
   * 타이핑을 정지합니다.
   */
  pause() {
    this.isPaused = true;
    this.processId++;
  }

  /**
   * 타이핑을 재개합니다.
   */
  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.next(this.processId);
  }

  /**
   * 파기
   */
  destroy() {
    this.processId = null;
    this.subject.unsubscribe();
    this.subject = null;
  }
}
