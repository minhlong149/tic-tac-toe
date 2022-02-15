let scoreBoard = {
  win: 0,
  lose: 0,
  ties: 0,
};

class Player {
  mark: string;
  score: number;

  constructor(mark: string) {
    this.mark = mark;
    this.score = 0;
  }

  won() {
    this.score++;
    console.log("You won!");
  }
}

let user = new Player("x");
let opponent = new Player("o");

class TicTacToe {
  #GameBoard: [
    [string, string, string],
    [string, string, string],
    [string, string, string]
  ];

  isFinished: boolean;

  constructor() {
    this.#GameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.isFinished = false;
  }

  move(player: Player, x: number, y: number) {
    if (this.#GameBoard[x][y] == "" && !this.isFinished) {
      this.#GameBoard[x][y] = player.mark;
      if (this.#foundWinner(player)) {
        this.#endGame(player);
      }
    } else console.log("Invalid!");
    return this.#GameBoard;
  }

  #checkRow(player: Player, index: number, toColumn: boolean = false) {
    for (let i = 0; i < 3; ++i) {
      if (toColumn) {
        if (this.#GameBoard[index][i] != player.mark) return false;
      } else {
        if (this.#GameBoard[i][index] != player.mark) return false;
      }
    }
    return true;
  }

  #checkCross(player: Player, reverse: boolean = false) {
    for (let i = 0; i < 3; ++i) {
      if (reverse) {
        if (this.#GameBoard[i][2 - i] != player.mark) return false;
      } else {
        if (this.#GameBoard[i][i] != player.mark) return false;
      }
    }
    return true;
  }

  #foundWinner(player: Player) {
    for (let i = 0; i < 3; ++i) {
      if (this.#checkRow(player, i)) {
        return true;
      }
      if (this.#checkRow(player, i, true)) {
        return true;
      }
    }
    return this.#checkCross(player) || this.#checkCross(player, true);
  }

  #endGame(winner: Player) {
    winner.won();
    this.isFinished = true;
  }
}

let newGame = new TicTacToe();
