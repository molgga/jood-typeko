import { Subject } from 'rxjs';
import { TypistEvent, TypistEventType, DelayEqual } from './types';
import { delay } from './utils';

export class ManualTypist {
  protected sourceMatrix: string[][];
  protected sourceFinished = '';
  protected sourceTypingTotal = 0;
  protected subject: Subject<TypistEvent>;
  protected counterRow = 0;
  protected counterColumn = 0;
  protected counterTyping = 0;
  protected speedMin = 0;
  protected speedMax = 100;
  protected delayByEquals: DelayEqual[] = [];
  output = '';

  constructor() {
    this.subject = new Subject();
  }

  observe() {
    return this.subject.asObservable();
  }

  setSourceMatrix(source: string[][]) {
    this.sourceMatrix = source;
    this.sourceFinished = source
      .map((row) => row[row.length - 1])
      .flat()
      .join('');
    this.sourceTypingTotal = source.flat().length;
  }

  setTypingSpeed(min = 0, max: number) {
    this.speedMin = min;
    this.speedMax = max;
  }

  getTypingSpeed() {
    return Math.random() * this.speedMax + this.speedMin;
  }

  findDelayByEqual(char: string) {
    return this.delayByEquals.find((v) => v.char === char);
  }

  findIndexDelayByEqual(char: string) {
    return this.delayByEquals.findIndex((v) => v.char === char);
  }

  addDelayByEqual(char: string, delay: number) {
    const delayEqual = this.findDelayByEqual(char);
    if (!delayEqual) {
      this.delayByEquals.push({ char, delay });
    }
  }

  removeDelayByEqual(char: string) {
    const index = this.findIndexDelayByEqual(char);
    if (0 < index) {
      this.delayByEquals.splice(index, 1);
    }
  }

  async next() {
    const columns = this.sourceMatrix[this.counterRow];
    const columnsLen = columns.length;
    const char = columns[this.counterColumn];
    const delayEqual = this.findDelayByEqual(char);
    if (delayEqual) {
      await delay(delayEqual.delay);
    } else {
      await delay(this.getTypingSpeed());
    }
    this.output += char;
    this.counterTyping++;
    this.dispatchType(TypistEventType.OUT_PUT);

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
      this.next();
    }
  }

  protected dispatchType(type: TypistEventType) {
    this.subject.next({
      type,
      value: this.output,
      rowIndex: this.counterRow,
      columnIndex: this.counterColumn,
      typingIndex: this.counterTyping,
      typingTotal: this.sourceTypingTotal,
    });
  }

  start() {
    this.next();
  }

  stop() {}

  reset() {}

  destroy() {}
}
