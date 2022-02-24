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
    ties;
    #GameBoard;
    winner; // player can't play if the game is finished
    constructor(userMark, opponentMark) {
        this.user = new Player(userMark);
        this.opponent = new Player(opponentMark);
        this.playerTurn = userMark == "x" ? this.user : this.opponent;
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
        this.playerTurn = this.user.mark == "x" ? this.user : this.opponent;
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
}
export { TicTacToe };
