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
}

let user = new Player("x");
let opponent = new Player("o");

class TicTacToe {
  #GameBoard: [
    [string, string, string],
    [string, string, string],
    [string, string, string]
  ];

  #winner: Player; // player can't play if the game is finished

  constructor() {
    this.#GameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
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

  move(player: Player, x: number, y: number) {
    if (this.#GameBoard[x][y] == "" && !this.#winner) {
      this.#GameBoard[x][y] = player.mark;
      if (this.#foundWinner(player)) {
        this.#winner = player; // winner
      }
    }
  }
}

let newGame = new TicTacToe();
