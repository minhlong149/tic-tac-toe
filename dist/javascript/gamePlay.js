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
    winner; // player can't play if the game is finished
    ties;
    #GameBoard;
    constructor(userMark, opponentMark) {
        this.user = new Player(userMark);
        this.opponent = new Player(opponentMark);
        this.playerGoFirst = this.user.mark == "x" ? this.user : this.opponent;
        this.playerTurn = this.user.mark == "x" ? this.user : this.opponent;
        this.winner = undefined;
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
        this.#GameBoard[x][y] = player.mark;
        if (this.foundWinner(player)) {
            this.winner = player;
            this.winner.won();
        }
        else if (this.isTies()) {
            this.ties++;
        }
        else {
            this.playerTurn =
                this.playerTurn == this.user ? this.opponent : this.user;
        }
    }
    resetGameBoard() {
        if (this.isTies()) {
            console.log("Tie " + this.playerTurn.mark);
            this.playerTurn =
                this.playerGoFirst == this.user ? this.opponent : this.user;
        }
        else if (!this.winner) {
            console.log("Reset");
            // Game reset, no winner, who goes first keep go first
            this.playerTurn = this.playerGoFirst;
        }
        else {
            console.log("Done");
            this.playerTurn = this.winner == this.user ? this.opponent : this.user;
        }
        this.playerGoFirst = this.playerTurn;
        this.winner = undefined;
        this.#GameBoard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }
    isTies() {
        for (let i = 0; i < 3; ++i)
            for (let j = 0; j < 3; ++j) {
                if (this.#GameBoard[i][j] == "")
                    return false;
            }
        return true;
    }
    cpuMove() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.movable(row, col)) {
                    let checkBoard = this.#GameBoard.map((arr) => arr.slice());
                    // Check if instant win
                    checkBoard[row][col] = this.opponent.mark;
                    if (checkBoard[row][0] === this.opponent.mark &&
                        checkBoard[row][1] === this.opponent.mark &&
                        checkBoard[row][2] === this.opponent.mark) {
                        return [row, col];
                    }
                    if (checkBoard[0][col] === this.opponent.mark &&
                        checkBoard[1][col] === this.opponent.mark &&
                        checkBoard[2][col] === this.opponent.mark) {
                        return [row, col];
                    }
                    if (checkBoard[0][0] === this.opponent.mark &&
                        checkBoard[1][1] === this.opponent.mark &&
                        checkBoard[2][2] === this.opponent.mark) {
                        return [row, col];
                    }
                    if (checkBoard[0][2] === this.opponent.mark &&
                        checkBoard[1][1] === this.opponent.mark &&
                        checkBoard[2][0] === this.opponent.mark) {
                        return [row, col];
                    }
                    // Check user could win
                    checkBoard[row][col] = this.user.mark;
                    if (checkBoard[row][0] === this.user.mark &&
                        checkBoard[row][1] === this.user.mark &&
                        checkBoard[row][2] === this.user.mark) {
                        return [row, col];
                    }
                    if (checkBoard[0][col] === this.user.mark &&
                        checkBoard[1][col] === this.user.mark &&
                        checkBoard[2][col] === this.user.mark) {
                        return [row, col];
                    }
                    if (checkBoard[0][0] === this.user.mark &&
                        checkBoard[1][1] === this.user.mark &&
                        checkBoard[2][2] === this.user.mark) {
                        return [row, col];
                    }
                    if (checkBoard[0][2] === this.user.mark &&
                        checkBoard[1][1] === this.user.mark &&
                        checkBoard[2][0] === this.user.mark) {
                        return [row, col];
                    }
                }
            }
        }
        /**
         * CPU make a random move
         */
        let randomRow, randomCol;
        do {
            randomRow = Math.round(Math.random() * 2);
            randomCol = Math.round(Math.random() * 2);
        } while (!this.movable(randomRow, randomCol));
        return [randomRow, randomCol];
    }
}
export { TicTacToe };
