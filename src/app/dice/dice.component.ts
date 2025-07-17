import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  diceValue: number = 0;
  
  @Output() diceRolled = new EventEmitter<number>();

  @Input() rolledDice: number = 0;
  @Input() currentPlayer: string = '';
  @Output() tokenMoved = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }

  rollDice() {
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    // this.diceValue = 1;
    this.diceRolled.emit(this.diceValue);
  }

  getDiceIconClass(): string {
    return `bi bi-dice-${this.diceValue}`;
  }

}
