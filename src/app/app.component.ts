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

  handleDiceRoll(value: number) {
    this.lastDiceValue = value;
    this.canRoll = false;

    console.log("Player: " + this.currentPlayerIndex +"&& Dice: "+this.lastDiceValue);
    if (value === 6) {
      this.consecutiveSixes++;

      if (this.consecutiveSixes >= 3) {

        this.consecutiveSixes = 0;
        this.isWaitingForBonusRoll = false;
        this.moveToNextPlayer();


      } else { // Let player roll again (don't move to next player yet)
        this.giveAChal(this.currentPlayerIndex, this.lastDiceValue);
        this.isWaitingForBonusRoll = true;

      }

    } else {
      this.consecutiveSixes = 0;
      this.isWaitingForBonusRoll = false;
      this.giveAChal(this.currentPlayerIndex, this.lastDiceValue);
      this.moveToNextPlayer();
    }
  }

  moveToNextPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }

  @ViewChild(BoardComponent) boardComponent!: BoardComponent;
  giveAChal(currentPlayerIndex: number, lastDiceValue: number) {
    const color = this.players[currentPlayerIndex];
    this.boardComponent.moveToken(color, lastDiceValue);
  }


}
