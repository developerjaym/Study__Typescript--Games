export enum SlotEventType {
    BET_MADE,
    SPIN_OVER,
    START
}

export interface SlotEvent {
  type: SlotEventType;
  balance: number;
  currentBet: number;
  results: SlotResult[];
  wheels: SlotWheel[];
}

export interface SlotResult {
  bet: number;
  winnings: number;
  slotCombo: SlotCombo;
  message?: string;
}

export interface SlotWheel {
  position: number;
  faces: SlotFace[];
}

export enum SlotFaceType {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  ELEVEN,
  TWELVE,
}

export interface SlotCombo {
  name: string;
  faces: SlotFaceType[];
  multiplier: number;
}

export interface SlotFace {
  id: string;
  type: SlotFaceType;
}
