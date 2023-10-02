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
  JAVA,
  JAVASCRIPT,
  PYTHON,
  FLASK,
  HIBERNATE,
  SQLALCHEMY,
  SPRING_BOOT,
  ALEMBIC,
  FLYWAY,
  REACT,
  ANGULAR,
  VUE,
  EXPRESS,
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
  static get FRONT_END(): SlotCombo {
    return {
      name: "Front End Phenom",
      multiplier: 3,
      faces: [SlotFaceType.REACT, SlotFaceType.ANGULAR, SlotFaceType.VUE],
    };
  }
  static get BACK_END(): SlotCombo {
    return {
      name: "Back End Bonanza",
      multiplier: 3,
      faces: [
        SlotFaceType.EXPRESS,
        SlotFaceType.SPRING_BOOT,
        SlotFaceType.FLASK,
      ],
    };
  }
}

export interface SlotFace {
  id: string;
  type: SlotFaceType;
  icon: string;
}
