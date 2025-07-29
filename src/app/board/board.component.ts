import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type CellType = {
  zone: string;
  tokens: string[];
  isChickstar: boolean;
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  gridSize = 15;
  board: CellType[][] = [];

  @Input() rolledDice: number = 0;
  @Input() activeColor!: string;
  @Output() tokenMoveDone = new EventEmitter<void>();



  constructor() { }

  ngOnInit(): void {
    this.generateBoard();
  }
  generateBoard() {
    const size = 15;
    this.board = Array(size).fill(null).map(
      () => Array(size).fill(null).map(() => ({
        zone: '',
        tokens: [],
        isChickstar: false
      }))

    );
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = this.board[row][col];
        // Red home zone (top-left 6x6) 
        if (row < 6 && col < 6) cell.zone = 'red-home';
        // Green home zone (top-right 6x6) 
        else if (row < 6 && col > 8) cell.zone = 'green-home';
        // Yellow home zone (bottom-left 6x6) 
        else if (row > 8 && col < 6) cell.zone = 'blue-home';
        // Blue home zone (bottom-right 6x6) 
        else if (row > 8 && col > 8) cell.zone = 'yellow-home';
        // Center triangle (3x3) 
        else if (row >= 6 && row <= 8 && col >= 6 && col <= 8) {
          cell.zone = 'center';
        }


        // For now, mark everything else as "path" 
        else cell.zone = 'path';
      }
    }


    this.setTokens('red', [[1, 1], [1, 4], [4, 1], [4, 4]]);
    this.setTokens('green', [[1, 10], [1, 13], [4, 10], [4, 13]]);
    this.setTokens('blue', [[10, 1], [10, 4], [13, 1], [13, 4]]);
    this.setTokens('yellow', [[10, 10], [10, 13], [13, 10], [13, 13]]);


    this.setChickstars([
      [6, 1, 'red-chickstar'],
      [8, 2],
      [1, 8, 'green-chickstar'],
      [2, 6],
      [8, 13, 'yellow-chickstar'],
      [6, 12],
      [13, 6, 'blue-chickstar'],
      [12, 8]
    ]);

  }

  setTokens(tokenColor: string, positions: [number, number][]) {
    positions.forEach(([row, col], index) => {
      this.board[row][col].tokens.push(`${tokenColor}-${index}`);
    });
  }


  setChickstars(chickstars: [number, number, string?][]) {
    chickstars.forEach(([row, col, zone]) => {
      this.board[row][col].isChickstar = true;
      if (zone) {
        this.board[row][col].zone = zone;
      }
    });
  }


  // These are sample path coordinates for a 15x15 classic Ludo layout
  redPath: [number, number][] = [
    [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6],
    [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10],
    [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10],
    [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14, 6], [13, 6],
    [12, 6], [11, 6], [10, 6], [9, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
    [7, 0], [6, 0],  // then enters home column
    [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]
  ];

  greenPath: [number, number][] = [
    [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13],
    [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8],
    [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6],
    [9, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6, 1],
    [6, 2], [6, 3], [6, 4], [6, 5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
    [0, 7], [0, 8],
    [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]
  ];

  yellowPath: [number, number][] = [
    [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
    [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9, 6], [8, 5], [8, 4],
    [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4],
    [6, 5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8],
    [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
    [7, 14], [8, 14],
    [7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]
  ];

  bluePath: [number, number][] = [
    [13, 6], [12, 6], [11, 6], [10, 6], [9, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1],
    [8, 0], [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 6], [4, 6],
    [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8],
    [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13],
    [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
    [14, 7], [14, 6],
    [13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]
  ];

  getPathForColor(color: string): [number, number][] | null {
    switch (color) {
      case 'red': return this.redPath;
      case 'green': return this.greenPath;
      case 'yellow': return this.yellowPath;
      case 'blue': return this.bluePath;
      default: return null;
    }
  }


  moveToken(tokenId: string, steps: number) {
    const color = tokenId.split('-')[0];
    const path = this.getPathForColor(color);
    if (!path) return;

    let currentIndex = -1;
    for (let i = 0; i < path.length; i++) {
      const [r, c] = path[i];
      if (this.board[r][c].tokens.includes(tokenId)) {
        currentIndex = i;
        break;
      }
    }

    if (currentIndex === -1) {
      if (steps === 6) {
        // remove from home zone
        for (let r = 0; r < this.gridSize; r++) {
          for (let c = 0; c < this.gridSize; c++) {
            const idx = this.board[r][c].tokens.indexOf(tokenId);
            if (idx > -1) {
              this.board[r][c].tokens.splice(idx, 1);
              break;
            }
          }
        }
        // now place it on the start path
        const [startRow, startCol] = path[0];
        this.board[startRow][startCol].tokens.push(tokenId);
        this.board = [...this.board];
      }
      return;
    }

    const [oldRow, oldCol] = path[currentIndex];
    const idx = this.board[oldRow][oldCol].tokens.indexOf(tokenId);
    if (idx > -1) {
      this.board[oldRow][oldCol].tokens.splice(idx, 1);
    }

    const newIndex = currentIndex + steps;
    if (newIndex >= path.length) {
      this.board[oldRow][oldCol].tokens.push(tokenId);
      return;
    }

    const [newRow, newCol] = path[newIndex];
    this.board[newRow][newCol].tokens.push(tokenId);
  }


  tokenMoved: boolean = false;


  onTokenClick(tokenId: string) {
    if (this.tokenMoved) {
      console.warn('You have already moved a token for this dice roll!');
      return;
    }
    const tokenColor = tokenId.split('-')[0];
    if (tokenColor !== this.activeColor) {
      console.warn(`Not ${tokenColor}'s turn! It's ${this.activeColor}'s turn.`);
      return;
    }
    if (this.rolledDice === 0) {
      console.warn('Roll the dice first!');
      return;
    }

    this.moveToken(tokenId, this.rolledDice);

    // Emit event to AppComponent after move
    this.tokenMoveDone.emit();

    // allow another move if rolledDice was 6
    if (this.rolledDice !== 6) {
      this.tokenMoved = true;
    } else {
      this.tokenMoved = false;
    }
  }

  canPlayerMove(color: string, diceValue: number): boolean {
  const path = this.getPathForColor(color);
  if (!path) return false;

  // Check if any token is already on the path and can move
  for (let i = 0; i < path.length; i++) {
    const [r, c] = path[i];
    if (this.board[r][c].tokens.some(t => t.startsWith(color))) {
      return true;
    }
  }

  // If no token on path, check if dice is 6 and any token is in home
  if (diceValue === 6) {
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        if (this.board[r][c].tokens.some(t => t.startsWith(color))) {
          return true;
        }
      }
    }
  }

  return false;
}


}







