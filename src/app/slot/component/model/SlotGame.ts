import { Observable } from "../../../../library/observer/observer.js";
import injector from "../../../injector/Injector.js";
import slotConfiguration from "../../service/configuration/SlotConfigurationLoader.js";
import {
  SlotEvent,
  SlotEventType,
  SlotResult
} from "../event/SlotEvent.js";

const randomNumberBetweenZeroAnd = (otherNumber: number) =>
  Math.floor(Math.random() * otherNumber);

interface BetState {
  currentBet: number;
  balance: number;
}
interface MachineState {
  wheels: number[];
}

export class SlotGame extends Observable<SlotEvent> {
  private static STARTING_BALANCE = 100;
  private betState: BetState;
  private machineState: MachineState;
  private results: SlotResult[];
  constructor(private slotScoreService = injector.getSlotScoreService(), private configuration = slotConfiguration) {
    super();
    this.betState = {
      balance: SlotGame.STARTING_BALANCE,
      currentBet: 0,
    };
    this.machineState = {wheels: this.configuration.wheels.map(wheel => 0)};
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
        ...this.configuration.wheels.map((wheel) => randomNumberBetweenZeroAnd(wheel.length)),
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
