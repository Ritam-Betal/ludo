import { Component, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ludo';
  lastDiceValue: number = 0;


  players = ['red', 'green', 'yellow', 'blue'];
  currentPlayerIndex = 0;
  isWaitingForBonusRoll = false;
  consecutiveSixes = 0;
  canRoll = true;

  @ViewChild(BoardComponent) boardComponent!: BoardComponent;

  handleDiceRoll(value: number) {
    this.lastDiceValue = value;
    this.canRoll = false;
    this.boardComponent.tokenMoved = false;

    const currentColor = this.players[this.currentPlayerIndex];
    console.log(`Player: ${this.currentPlayerIndex} && Dice: ${this.lastDiceValue}`);

    // Check if player has any valid move
    const canMove = this.boardComponent.canPlayerMove(currentColor, value);

    if (!canMove) {
      console.log(`No valid moves for ${currentColor}. Skipping turn.`);
      this.consecutiveSixes = 0;
      this.moveToNextPlayer();
      return;
    }

    if (value === 6) {
      this.consecutiveSixes++;

      if (this.consecutiveSixes >= 3) {
        console.log('Three consecutive sixes! Turn lost.');
        this.consecutiveSixes = 0;
        // Skip move and go to next player directly
        this.moveToNextPlayer();
      } else {
        // wait for token move, same player stays
        console.log('Rolled a 6! Move a token and roll again.');
      }

    } else {
      // wait for token move, next player handled in onTokenMoveDone
      this.consecutiveSixes = 0;
    }
  }


  moveToNextPlayer() {
    // only switch player if not waiting for bonus roll
    if (!this.isWaitingForBonusRoll) {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      console.log(`Next player: ${this.players[this.currentPlayerIndex]}`);
    }
    // allow dice roll for whoever's turn it is
    this.canRoll = true;
  }

  onTokenMoveDone() {
    console.log('Token moved by player:', this.players[this.currentPlayerIndex]);

    // After token move is done:
    if (this.lastDiceValue === 6 && this.consecutiveSixes < 3) {
      // Stay on same player, allow another roll
      console.log('Rolled 6, same player rolls again');
      this.canRoll = true;
    } else {
      // Normal case, go to next player
      this.moveToNextPlayer();
    }
  }
}
