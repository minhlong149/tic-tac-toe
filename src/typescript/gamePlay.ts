class Player {
  mark: string;
  #score: number;

  constructor(mark: string) {
    this.mark = mark;
    this.#score = 0;
  }

  won() {
    this.#score++;
  }

  getScore() {
    return this.#score;
  }
}

class TicTacToe {
  user: Player;
  opponent: Player;
  playerTurn: Player;

  #GameBoard: [
    [string, string, string],
    [string, string, string],
    [string, string, string]
  ];

  winner: Player; // player can't play if the game is finished

  constructor(userMark: string, opponentMark: string) {
    this.user = new Player(userMark);
    this.opponent = new Player(opponentMark);
    this.playerTurn = userMark == "x" ? this.user : this.opponent;

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

  foundWinner(player: Player = this.playerTurn) {
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

  movable(x: number, y: number) {
    return this.#GameBoard[x][y] == "" && !this.winner;
  }

  move(x: number, y: number, player: Player = this.playerTurn) {
    if (this.movable(x, y)) {
      this.#GameBoard[x][y] = player.mark;
      if (this.foundWinner(player)) {
        this.winner = player;
        this.winner.won();
      } else {
        this.playerTurn =
          this.playerTurn == this.user ? this.opponent : this.user;
      }
    }
  }

  resetGameBoard() {
    this.#GameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.playerTurn = this.user.mark == "x" ? this.user : this.opponent;
    this.winner = undefined;
  }
}

export { TicTacToe };
