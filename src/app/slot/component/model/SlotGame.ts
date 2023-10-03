import { Observable } from "../../../../library/observer/observer.js";
import {
  SLOT_COMBOS,
  SlotCombo,
  SlotEvent,
  SlotEventType,
  SlotFace,
  SlotFaceType,
  SlotResult,
  SlotWheel,
} from "../event/SlotEvent.js";

const randomNumberBetweenZeroAnd = (otherNumber: number) => Math.floor(Math.random() * otherNumber)

interface BetState {
  currentBet: number;
  balance: number;
}
interface MachineState {
  wheels: SlotWheel[];
}

const INITIAL_WHEEL = [
  {
    id: "1",
    type: SlotFaceType.SEVEN,
    icon: `${SlotFaceType.SEVEN}`,
  },
  {
    id: "2",
    type: SlotFaceType.TEN,
    icon: `${SlotFaceType.TEN}`,
  },
  {
    id: "3",
    type: SlotFaceType.TWELVE,
    icon: `${SlotFaceType.TWELVE}`,
  },
  {
    id: "4",
    type: SlotFaceType.THREE,
    icon: `${SlotFaceType.THREE}`,
  },
  {
    id: "5",
    type: SlotFaceType.EIGHT,
    icon: `${SlotFaceType.EIGHT}`,
  },
  {
    id: "6",
    type: SlotFaceType.FOUR,
    icon: `${SlotFaceType.FOUR}`,
  },
  {
    id: "7",
    type: SlotFaceType.ZERO,
    icon: `${SlotFaceType.ZERO}`,
  },
  {
    id: "8",
    type: SlotFaceType.ONE,
    icon: `${SlotFaceType.ONE}`,
  },
  {
    id: "9",
    type: SlotFaceType.TWO,
    icon: `${SlotFaceType.TWO}`,
  },
  {
    id: "10",
    type: SlotFaceType.NINE,
    icon: `${SlotFaceType.NINE}`,
  },
  {
    id: "11",
    type: SlotFaceType.SIX,
    icon: `${SlotFaceType.SIX}`,
  },
  {
    id: "12",
    type: SlotFaceType.FIVE,
    icon: `${SlotFaceType.FIVE}`,
  }
]
const INITIAL_MACHINE_STATE = {
  wheels: [
    {
      position: 0,
      faces: [...INITIAL_WHEEL],
    },
    {
      position: 2,
      faces: [...INITIAL_WHEEL],
    },
    {
      position: 3,
      faces: [...INITIAL_WHEEL],
    },
  ], 
}

export class SlotGame extends Observable<SlotEvent> {
  private static STARTING_BALANCE = 100;
  private betState: BetState;
  private machineState: MachineState;
  private results: SlotResult[];
  constructor(private slotScoreService = new SlotScoreService()) {
    super();
    this.betState = {
      balance: SlotGame.STARTING_BALANCE,
      currentBet: 0,
    };
    this.machineState = INITIAL_MACHINE_STATE;
    this.results = [];
  }
  start(): void {
    this.notifyAll({
      type: SlotEventType.START,
      ...this.betState,
      ...this.machineState,
      results: this.results,
    });
  }
  onPull(): void {
    if (this.canPull(this.betState)) {
      this.machineState.wheels = [...this.machineState.wheels.map(wheel => ({...wheel, position: randomNumberBetweenZeroAnd(wheel.faces.length)}))]
      const matchingCombo = this.slotScoreService.test(this.machineState.wheels)
      const winnings = this.betState.currentBet * matchingCombo.multiplier
      this.betState.balance = winnings
      this.results.push({
        bet: this.betState.currentBet,
        winnings,
        slotCombo: matchingCombo
      })
      this.betState.currentBet = 0
      this.notifyAll({
        type: SlotEventType.SPIN_OVER,
        ...this.betState,
        ...this.machineState,
        results: this.results,
      });
    }
  }
  onChangeBet(byThisAmount: number): void {
    if (
      this.isLegalBet(
        this.betState.currentBet,
        byThisAmount,
        this.betState.balance
      )
    ) {
      this.betState.balance -= byThisAmount;
      this.betState.currentBet += byThisAmount;
      this.notifyAll({
        type: SlotEventType.BET_MADE,
        ...this.betState,
        ...this.machineState,
        results: this.results,
      });
    }
  }
  private isLegalBet(
    currentBet: number,
    change: number,
    balance: number
  ): boolean {
    return change <= balance && currentBet + change >= 0;
  }
  private canPull(betState: BetState) {
    return betState.currentBet > 0;
  }
}

class SlotScoreService {
  constructor() {

  }
  test(wheels: SlotWheel[]): SlotCombo {
    const faces = wheels.map(wheel => wheel.faces[wheel.position])
    if(this.matches(SLOT_COMBOS.MULTIPLES_OF_FOUR, faces)) {
      return SLOT_COMBOS.MULTIPLES_OF_FOUR
    }
    else if(this.matches(SLOT_COMBOS.MULTIPLES_OF_THREE, faces)) {
      return SLOT_COMBOS.MULTIPLES_OF_FOUR
    }
    else if(faces.every(face => face.type === faces[0].type)) {
      return SLOT_COMBOS.N_OF_A_KIND
    }
    return this.failCombo();
  }
  private matches(slotCombo: SlotCombo, faces: SlotFace[]): boolean {
    return slotCombo.faces.every((faceType, index) => faces[index].type === faceType)
  }
  private failCombo(): SlotCombo {
    return {
      name: "FAIL",
      faces: [],
      multiplier: 0
    }
  }
}