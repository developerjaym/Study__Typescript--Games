import { Observable } from "../../../../library/observer/observer.js";
import injector from "../../../injector/Injector.js";
import {
  SlotEvent,
  SlotEventType,
  SlotFaceType,
  SlotResult,
  SlotWheel,
} from "../event/SlotEvent.js";

const randomNumberBetweenZeroAnd = (otherNumber: number) =>
  Math.floor(Math.random() * otherNumber);

interface BetState {
  currentBet: number;
  balance: number;
}
interface MachineState {
  wheels: SlotWheel[];
}

const INITIAL_WHEEL = [
  {
    id: "0",
    type: SlotFaceType.ZERO,
  },
  {
    id: "1",
    type: SlotFaceType.ONE,
  },
  {
    id: "2",
    type: SlotFaceType.TWO,
  },
  {
    id: "3",
    type: SlotFaceType.THREE,
  },
  {
    id: "4",
    type: SlotFaceType.FOUR,
  },
  {
    id: "5",
    type: SlotFaceType.FIVE,
  },
  {
    id: "6",
    type: SlotFaceType.SIX,
  },
  {
    id: "7",
    type: SlotFaceType.SEVEN,
  },
  {
    id: "8",
    type: SlotFaceType.EIGHT,
  },
  {
    id: "9",
    type: SlotFaceType.NINE,
  },
  {
    id: "10",
    type: SlotFaceType.TEN,
  },
  {
    id: "11",
    type: SlotFaceType.ELEVEN,
  },
  {
    id: "12",
    type: SlotFaceType.TWELVE,
  },
];
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
};

export class SlotGame extends Observable<SlotEvent> {
  private static STARTING_BALANCE = 100;
  private betState: BetState;
  private machineState: MachineState;
  private results: SlotResult[];
  constructor(private slotScoreService = injector.getSlotScoreService()) {
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
      this.machineState.wheels = [
        ...this.machineState.wheels.map((wheel) => ({
          ...wheel,
          position: randomNumberBetweenZeroAnd(wheel.faces.length),
        })),
      ];
      const matchingCombo = this.slotScoreService.test(
        this.machineState.wheels
      );
      const payout = (this.betState.currentBet * matchingCombo.multiplier)
      const winnings = payout - this.betState.currentBet;
      this.betState.balance = this.betState.balance + payout;
      this.results.push({
        bet: this.betState.currentBet,
        winnings,
        slotCombo: matchingCombo,
      });
      this.betState.currentBet = 0;
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
