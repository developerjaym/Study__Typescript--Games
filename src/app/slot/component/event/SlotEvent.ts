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

export class SLOT_COMBOS {
  static get N_OF_A_KIND(): SlotCombo {
    return {
      name: "N of a Kind",
      multiplier: 2,
      faces: []
    }
  }
  static get MULTIPLES_OF_THREE(): SlotCombo {
    return {
      name: "3s",
      multiplier: 3,
      faces: [SlotFaceType.NINE, SlotFaceType.SIX, SlotFaceType.THREE],
    };
  }
  static get MULTIPLES_OF_FOUR(): SlotCombo {
    return {
      name: "4s",
      multiplier: 3,
      faces: [
        SlotFaceType.TWELVE,
        SlotFaceType.EIGHT,
        SlotFaceType.FOUR,
      ],
    };
  }
}

export interface SlotFace {
  id: string;
  type: SlotFaceType;
}
