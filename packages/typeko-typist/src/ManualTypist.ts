import { Subject } from 'rxjs';
import { TypistEvent, TypistEventType, DelayEqual } from './types';
import { delay } from './utils';

/**
 * 수동 타이핑 입력기
 */
export class ManualTypist {
  protected sourceMatrix: string[][];
  protected sourceTypingTotal = 0;
  protected sourceFinished = '';
  protected sourceOutput = '';
  protected subject: Subject<TypistEvent>;
  protected counterRow = 0;
  protected counterColumn = 0;
  protected counterTyping = 0;
  protected speedMin = 0;
  protected speedMax = 100;
  protected delayByEquals: DelayEqual[] = [];
  protected startId: number = null;
  protected isPaused = false;
  protected output = '';

  constructor() {
    this.subject = new Subject();
  }

  /**
   * 옵저버
   */
  observe() {
    return this.subject.asObservable();
  }

  getState() {
    return {
      sourceMatrix: this.sourceMatrix,
      sourceTypingTotal: this.sourceTypingTotal,
      sourceFinished: this.sourceFinished,
      sourceOutput: this.sourceOutput,
      counterRow: this.counterRow,
      counterColumn: this.counterColumn,
      counterTyping: this.counterTyping,
      speedMin: this.speedMin,
      speedMax: this.speedMax,
      delayByEquals: this.delayByEquals,
      startId: this.startId,
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
  setTypingSpeed(min = 0, max: number) {
    this.speedMin = min;
    this.speedMax = max;
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
  protected async next(startId: number) {
    const columns = this.sourceMatrix[this.counterRow];
    const columnsLen = columns.length;
    const char = columns[this.counterColumn];
    const delayEqual = this.findDelayByEqual(char);
    await delay(this.getTypingSpeed());

    if (this.startId !== startId) return;

    this.output += char;
    this.counterTyping++;
    if (this.startId === startId) {
      this.dispatchType(TypistEventType.OUT_PUT);
      if (delayEqual) {
        await delay(delayEqual.delay);
      }
    }

    if (this.startId === startId) {
      if (this.counterColumn < columnsLen - 1) {
        this.output = this.output.substring(0, this.output.length - 1);
        this.counterColumn++;
      } else {
        this.counterRow++;
        this.counterColumn = 0;
      }
      if (this.sourceMatrix.length <= this.counterRow) {
        this.dispatchType(TypistEventType.FINISHED);
      } else {
        if (!this.isPaused) {
          this.next(startId);
        }
      }
    }
  }

  /**
   * 타이핑시 이벤트를 전파합니다.
   */
  protected dispatchType(type: TypistEventType) {
    this.sourceOutput = this.output;
    this.subject.next({
      type,
      value: this.output,
      rowIndex: this.counterRow,
      columnIndex: this.counterColumn,
      typingIndex: this.counterTyping,
      typingTotal: this.sourceTypingTotal,
    });
  }

  /**
   * 타이핑을 시작합니다.
   */
  start() {
    this.isPaused = false;
    this.counterRow = 0;
    this.counterColumn = 0;
    this.counterTyping = 0;
    this.output = '';
    this.startId = this.startId + 1;
    this.next(this.startId);
  }

  /**
   * 타이핑을 정지합니다.
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * 타이핑을 재개합니다.
   */
  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.next(this.startId);
  }

  destroy() {
    this.startId = null;
    this.subject.unsubscribe();
    this.subject = null;
  }
}
