import { MatchConfiguration } from "../../service/configuration/SlotConfiguration";

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
  wheels: number[];
}

export interface SlotResult {
  bet: number;
  winnings: number;
  slotCombo: MatchConfiguration;
}
