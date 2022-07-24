class Player {
    mark;
    #score;
    constructor(mark) {
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
    user;
    opponent;
    playerTurn;
    playerGoFirst;
    ties;
    #GameBoard;
    winner; // player can't play if the game is finished
    constructor(userMark, opponentMark) {
        this.user = new Player(userMark);
        this.opponent = new Player(opponentMark);
        this.playerTurn = this.user.mark == "x" ? this.user : this.opponent;
        this.playerGoFirst = this.user.mark == "x" ? this.user : this.opponent;
        this.ties = 0;
        this.#GameBoard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }
    #checkRow(player, index, toColumn = false) {
        for (let i = 0; i < 3; ++i) {
            if (toColumn) {
                if (this.#GameBoard[index][i] != player.mark)
                    return false;
            }
            else {
                if (this.#GameBoard[i][index] != player.mark)
                    return false;
            }
        }
        return true;
    }
    #checkCross(player, reverse = false) {
        for (let i = 0; i < 3; ++i) {
            if (reverse) {
                if (this.#GameBoard[i][2 - i] != player.mark)
                    return false;
            }
            else {
                if (this.#GameBoard[i][i] != player.mark)
                    return false;
            }
        }
        return true;
    }
    foundWinner(player = this.playerTurn) {
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
    movable(x, y) {
        return this.#GameBoard[x][y] == "" && !this.winner;
    }
    move(x, y, player = this.playerTurn) {
        if (this.movable(x, y)) {
            this.#GameBoard[x][y] = player.mark;
            if (this.foundWinner(player)) {
                this.winner = player;
                this.winner.won();
                this.playerGoFirst =
                    this.winner == this.user ? this.opponent : this.user;
            }
            else {
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
        if (this.isTies() || !this.winner) {
            // Game not complete
            if (this.isTies()) {
                // PLayer go second last game goes first
                this.playerTurn =
                    this.playerGoFirst == this.user ? this.opponent : this.user;
            }
            else {
                // Game reset, who goes first keep go first
                this.playerTurn = this.playerGoFirst;
            }
        }
        else {
            // game complete
            this.playerTurn = this.winner == this.user ? this.opponent : this.user;
        }
        this.winner = undefined;
    }
    isTies() {
        for (let i = 0; i < 3; ++i)
            for (let j = 0; j < 3; ++j) {
                if (this.#GameBoard[i][j] == "")
                    return false;
            }
        this.ties++;
        return true;
    }
    cpuMove() {
        let x, y;
        do {
            x = Math.round(Math.random() * 2);
            y = Math.round(Math.random() * 2);
        } while (!this.movable(x, y));
        let score = [
            [1, 0, 1],
            [0, 2, 0],
            [1, 0, 1],
        ];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.movable(i, j)) {
                    let checkBoard = this.#GameBoard.map((arr) => arr.slice());
                    checkBoard[i][j] = this.opponent.mark;
                    // Check if instant win
                    // Check row
                    if (checkBoard[i][0] === this.opponent.mark &&
                        checkBoard[i][1] === this.opponent.mark &&
                        checkBoard[i][2] === this.opponent.mark) {
                        console.log("row win");
                        return [i, j];
                    }
                    // Check column
                    if (checkBoard[0][j] === this.opponent.mark &&
                        checkBoard[1][j] === this.opponent.mark &&
                        checkBoard[2][j] === this.opponent.mark) {
                        console.log("col win");
                        return [i, j];
                    }
                    // Check cross
                    if (checkBoard[0][0] === this.opponent.mark &&
                        checkBoard[1][1] === this.opponent.mark &&
                        checkBoard[2][2] === this.opponent.mark) {
                        console.log("cross win");
                        return [i, j];
                    }
                    if (checkBoard[0][2] === this.opponent.mark &&
                        checkBoard[1][1] === this.opponent.mark &&
                        checkBoard[2][0] === this.opponent.mark) {
                        console.log("cross rev win");
                        return [i, j];
                    }
                    // Check user could win
                    checkBoard[i][j] = this.user.mark;
                    if (checkBoard[i][0] === this.user.mark &&
                        checkBoard[i][1] === this.user.mark &&
                        checkBoard[i][2] === this.user.mark) {
                        return [i, j];
                    }
                    if (checkBoard[0][j] === this.user.mark &&
                        checkBoard[1][j] === this.user.mark &&
                        checkBoard[2][j] === this.user.mark) {
                        return [i, j];
                    }
                    if (checkBoard[0][0] === this.user.mark &&
                        checkBoard[1][1] === this.user.mark &&
                        checkBoard[2][2] === this.user.mark) {
                        return [i, j];
                    }
                    if (checkBoard[0][2] === this.user.mark &&
                        checkBoard[1][1] === this.user.mark &&
                        checkBoard[2][0] === this.user.mark) {
                        return [i, j];
                    }
                }
            }
        }
        return [x, y];
    }
}
export { TicTacToe };
