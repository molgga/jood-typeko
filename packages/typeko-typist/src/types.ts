export enum TypistEventType {
  OUT_PUT = 'OUT_PUT',
  FINISHED = 'FINISHED',
}

export interface TypistEvent {
  type: TypistEventType;
  value?: string;
  rowIndex?: number;
  columnIndex?: number;
  typingIndex?: number;
  typingTotal?: number;
}

export interface DelayEqual {
  char: string;
  delay: number;
}
