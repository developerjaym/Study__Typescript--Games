import { Observable } from "../../../../library/observer/observer.js";
import {
  SlotEvent,
  SlotEventType,
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
    type: SlotFaceType.ALEMBIC,
    icon: `${SlotFaceType.ALEMBIC}`,
  },
  {
    id: "2",
    type: SlotFaceType.ANGULAR,
    icon: `${SlotFaceType.ANGULAR}`,
  },
  {
    id: "3",
    type: SlotFaceType.EXPRESS,
    icon: `${SlotFaceType.EXPRESS}`,
  },
  {
    id: "4",
    type: SlotFaceType.FLASK,
    icon: `${SlotFaceType.FLASK}`,
  },
  {
    id: "5",
    type: SlotFaceType.FLYWAY,
    icon: `${SlotFaceType.FLYWAY}`,
  },
  {
    id: "6",
    type: SlotFaceType.HIBERNATE,
    icon: `${SlotFaceType.HIBERNATE}`,
  },
  {
    id: "7",
    type: SlotFaceType.JAVA,
    icon: `${SlotFaceType.JAVA}`,
  },
  {
    id: "8",
    type: SlotFaceType.JAVASCRIPT,
    icon: `${SlotFaceType.JAVASCRIPT}`,
  },
  {
    id: "9",
    type: SlotFaceType.PYTHON,
    icon: `${SlotFaceType.PYTHON}`,
  },
  {
    id: "10",
    type: SlotFaceType.REACT,
    icon: `${SlotFaceType.REACT}`,
  },
  {
    id: "11",
    type: SlotFaceType.SPRING_BOOT,
    icon: `${SlotFaceType.SPRING_BOOT}`,
  },
  {
    id: "12",
    type: SlotFaceType.SQLALCHEMY,
    icon: `${SlotFaceType.SQLALCHEMY}`,
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
  constructor() {
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
      
      // TODO update bet state
      // TODO update results
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
