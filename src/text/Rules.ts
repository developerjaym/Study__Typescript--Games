import { Icon } from "../game/view/Icon.js";

const rules = 
`${Icon.CELEBRATE}GBP${Icon.CELEBRATE}

SUMMARY
Try to build sequences of five or more dice of your color.

PLAY
•Green goes first.
•Purple goes second.
•Tap on an empty square to place the displayed die.
•Try to build sequences (seq.) of five or more dice.
  •A sequence can be horizontal, vertical, or diagonal.
  •A sequence's value is equal to the sum of the dice.
  •BUT a sequence with a ${Icon.ONE} is worth just 1 point.
•Your score is your highest-value seq + your lowest-value seq.
•Game ends when the board is full.
•The winner is the player with the highest score.`

export {rules}