import { AppIcon } from "../../../../gbp/component/view/AppIcon.js"

const rules = 
`PIECES
${AppIcon.KING_PIECE} King:
 •This piece cannot move.
 •Your goal is to capture your opponent's King.
 •The first piece you move becomes your King.
 ${AppIcon.DIAGONAL_PIECE} Diagonal-Mover:
 •This piece can move one space diagonally.
 ${AppIcon.VERTICAL_PIECE} UpDown-Mover:
 •This piece can move one space up or down.
 ${AppIcon.HORIZONTAL_PIECE} Side-Mover:
 •This piece can move one space left or right.
 ${AppIcon.ALL_PIECE} All-Mover:
 •This piece can move to any connecting square.
 •The first All-Mover you move is promoted to King.
 •Later they are promoted based on direction moved.
  •If moved diagonally, it'll be a Diagonal-Mover
  •If moved left or right, it'll be a Side-Mover
  •If moved up or down, it'll be an UpDown-Mover
PLAY
•Green goes first.
•Purple goes second.
•Capture pieces by landing on them.
•Capturing a King ends the game.`

export {rules}