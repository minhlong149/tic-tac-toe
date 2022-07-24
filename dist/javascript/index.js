import { TicTacToe } from "./gamePlay.js";
const choicePickHTML = `
  <main>
    <header>
      <div class="logo-container"><img class="logo" src="./assets/images/logo.svg" alt="logo"></div>
    </header>

    <div class="choice">
      <p class="choice__desc">Pick player's mark</p>
      <div class="choice__pick">
        <button id="btnX" class="choice__btn choice__btn--pick">
          <img id="imgX" src="./assets/images/icon-x-dark.svg" alt="o" height="60px" width="60px">
        </button>
        <button id="btnO"class="choice__btn">
          <img id="imgO"src="./assets/images/icon-o-gray.svg" alt="x" height="60px"width="60px">
        </button>
      </div>
      <p class="choice__desc choice__desc--faded">Reminder: X goes first</p>
    </div>
    
    <div class="start">
      <button id="btnCPU" class="start__btn btn btn--orange">New game (Vs CPU)</button>
      <button id="btnUser"class="start__btn btn btn--blue">New game (Vs Player)</button>
    </div> 
  </main>
`;
const playBoardHTML = `
  <main>
    <header>
      <img class="logo" src="./assets/images/logo.svg" alt="logo">
      <div class="turn">
        <img class="turn__icon" src="./assets/images/icon-x-gray.svg" width="20px" alt="player-turn-icon">
        <span>Turn</span>
      </div>
      <button class="reset btn btn--white"><img src="./assets/images/icon-restart.svg" alt="reset-icon"></button>
    </header>
    <div class="board">
      <div id="0" class="board__choice"></div>
      <div id="1" class="board__choice"></div>
      <div id="2" class="board__choice"></div>
      <div id="3" class="board__choice"></div>
      <div id="4" class="board__choice"></div>
      <div id="5" class="board__choice"></div>
      <div id="6" class="board__choice"></div>
      <div id="7" class="board__choice"></div>
      <div id="8" class="board__choice"></div>
    </div>
    <div class="score">
      <div class="score__btn score--user">
        <div class="score__player">(X)</div>
        <div class="score__score">0</div>
      </div>
      <div class="score__btn score--ties">
        <div class="score__player">Ties</div>
        <div class="score__score">0</div>
      </div>
      <div class="score__btn score--opponent">
        <div class="score__player">(O)</div>
        <div class="score__score">0</div>
      </div>
    </div>
  </main>
`;
(function choicePick() {
    // Reset play board HTMl
    const body = document.body;
    body.innerHTML = choicePickHTML;
    // Choice toggle
    const buttonX = document.querySelector("#btnX");
    const buttonO = document.querySelector("#btnO");
    const imageX = buttonX.querySelector("#imgX");
    const imageO = buttonO.querySelector("#imgO");
    const choiceButtons = document.querySelectorAll(".choice__btn");
    choiceButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (!button.classList.contains("choice__btn--pick")) {
                buttonX.classList.toggle("choice__btn--pick");
                buttonO.classList.toggle("choice__btn--pick");
                imageX.src = buttonX.classList.contains("choice__btn--pick")
                    ? "./assets/images/icon-x-dark.svg"
                    : "./assets/images/icon-x-gray.svg";
                imageO.src = buttonO.classList.contains("choice__btn--pick")
                    ? "./assets/images/icon-o-dark.svg"
                    : "./assets/images/icon-o-gray.svg";
            }
        });
    });
    // PLay vs. Player
    const buttonUser = document.querySelector("#btnUser");
    buttonUser.addEventListener("click", () => {
        // Create a game
        let newGame = buttonX.classList.contains("choice__btn--pick")
            ? new TicTacToe("x", "o")
            : new TicTacToe("o", "x");
        createBoardPlayer(newGame);
        // Player make a move
        const boardChoices = document.querySelectorAll(".board__choice");
        boardChoices.forEach((button) => {
            button.addEventListener("click", () => {
                if (newGame.movable(getX(button), getY(button))) {
                    playerMove(newGame, button, getX(button), getY(button));
                }
            });
            button.addEventListener("mouseenter", () => {
                if (newGame.movable(getX(button), getY(button))) {
                    button.innerHTML = `<img src="./assets/images/icon-${newGame.playerTurn.mark}-gray.svg">`;
                }
            });
            button.addEventListener("mouseleave", () => {
                if (newGame.movable(getX(button), getY(button))) {
                    button.innerHTML = ``;
                }
            });
        });
        // Reset board in-game
        const resetButton = document.querySelector(".reset");
        resetButton.addEventListener("click", () => {
            resetBoard(newGame);
        });
    });
    // PLay vs. computer
    const buttonCPU = document.querySelector("#btnCPU");
    buttonCPU.addEventListener("click", () => {
        let newGame = buttonX.classList.contains("choice__btn--pick")
            ? new TicTacToe("x", "o")
            : new TicTacToe("o", "x");
        createBoard(newGame);
        // CPU make a move if its goes first
        if (newGame.playerTurn.mark == "x" && newGame.opponent.mark == "x") {
            cpuMove(newGame);
        }
        // Player make a move
        const boardChoices = document.querySelectorAll(".board__choice");
        boardChoices.forEach((button) => {
            button.addEventListener("click", () => {
                if (newGame.movable(getX(button), getY(button))) {
                    playerMove(newGame, button, getX(button), getY(button));
                    // CPU move after
                    if (!newGame.foundWinner()) {
                        cpuMove(newGame);
                    }
                }
            });
            button.addEventListener("mouseenter", () => {
                if (newGame.movable(getX(button), getY(button))) {
                    button.innerHTML = `<img src="./assets/images/icon-${newGame.playerTurn.mark}-gray.svg">`;
                }
            });
            button.addEventListener("mouseleave", () => {
                if (newGame.movable(getX(button), getY(button))) {
                    button.innerHTML = ``;
                }
            });
        });
        const resetButton = document.querySelector(".reset");
        resetButton.addEventListener("click", () => {
            resetBoard(newGame);
        });
    });
    // Functions
    function createBoard(game) {
        body.innerHTML = playBoardHTML;
        const userScore = document.querySelector(".score--user");
        const opponentScore = document.querySelector(".score--opponent");
        const userMark = userScore.querySelector(".score__player");
        userMark.textContent =
            `${game.user.mark == "x" ? "You" : "CPU"} ` + userMark.textContent;
        const opponentMark = opponentScore.querySelector(".score__player");
        opponentMark.textContent =
            `${game.opponent.mark == "o" ? "CPU" : "You"} ` +
                opponentMark.textContent;
    }
    function createBoardPlayer(game) {
        body.innerHTML = playBoardHTML;
        const userScore = document.querySelector(".score--user");
        const opponentScore = document.querySelector(".score--opponent");
        const userMark = userScore.querySelector(".score__player");
        userMark.textContent =
            `${game.user.mark == "x" ? "You" : "Player"} ` + userMark.textContent;
        const opponentMark = opponentScore.querySelector(".score__player");
        opponentMark.textContent =
            `${game.opponent.mark == "o" ? "Player" : "You"} ` +
                opponentMark.textContent;
    }
    function resetBoard(game) {
        game.resetGameBoard();
        // Set turn icon to x
        const turnIcon = document.querySelector(".turn__icon");
        turnIcon.src = `./assets/images/icon-${game.playerTurn.mark == "o" ? "o" : "x"}-gray.svg`;
        // Empty board choices
        const choicePick = document.querySelectorAll(".board__choice");
        choicePick.forEach((choice) => {
            choice.innerHTML = "";
        });
        // Update scoreboard
        const xScore = document.querySelector(".score--user");
        const oScore = document.querySelector(".score--opponent");
        const tiesScore = document.querySelector(".score--ties");
        const xScorePoint = xScore.querySelector(".score__score");
        xScorePoint.textContent = `${game.user.mark == "x" ? game.user.getScore() : game.opponent.getScore()}`;
        const oScorePoint = oScore.querySelector(".score__score");
        oScorePoint.textContent = `${game.opponent.mark == "o"
            ? game.opponent.getScore()
            : game.user.getScore()}`;
        const tiesScorePoint = tiesScore.querySelector(".score__score");
        tiesScorePoint.textContent = `${game.ties}`;
        // If you go first and reset game, computer somehow go first bc the following code
        // CPU make a move
        if (game.playerTurn.mark == "x" &&
            game.opponent.mark == "x" &&
            game.playerGoFirst.mark == "x") {
            cpuMove(game);
        }
    }
    function playerMove(game, button, x, y) {
        button.innerHTML = `<img src="./assets/images/icon-${game.playerTurn.mark}.svg">`; //
        game.move(x, y);
        checkWinner(game);
    }
    function cpuMove(newGame) {
        const boardChoices = document.querySelectorAll(".board__choice");
        /**
         * CPU make a move
         * TODO: Make move smarter
         */
        const solu = newGame.cpuMove();
        let [randomX, randomY] = [solu[0], solu[1]];
        const target = boardChoices[`${3 * randomX + randomY}`];
        playerMove(newGame, target, randomX, randomY);
    }
    function checkWinner(game) {
        if (game.foundWinner()) {
            // Announce result
            const announcedHTML = `
        <div class="announced">
          <div class="announced__state">You ${game.winner == game.user ? "win" : "lose"}!</div>
          <div class="announced__winner">
            <img src="./assets/images/icon-${game.winner.mark}.svg" alt="">
            <span class="winner-${game.winner.mark}">take the round</span>
          </div>
          <div class="announced__option">
            <button id="quit" class="announced__button btn btn--white">Quit</button>
            <button id="new-game" class="announced__button btn btn--orange">New Game</button>
          </div>
        </div>
          `;
            const announced = document.createElement("div");
            announced.classList.add("announced__container");
            announced.innerHTML = announcedHTML;
            const body = document.querySelector("body");
            body.appendChild(announced);
            // Continues playing
            const newGameButton = document.querySelector("#new-game");
            newGameButton.addEventListener("click", () => {
                resetBoard(game);
                announced.remove();
            });
            // Quit game
            const quit = document.querySelector("#quit");
            quit.addEventListener("click", () => {
                choicePick();
            });
        }
        else if (game.isTies()) {
            resetBoard(game);
        }
        else {
            // Switch turn icon
            const turnIcon = document.querySelector(".turn__icon");
            turnIcon.src = `./assets/images/icon-${game.playerTurn.mark}-gray.svg`;
        }
    }
    function getX(button) {
        return Math.floor(Number(button.id) / 3);
    }
    function getY(button) {
        return Math.floor(Number(button.id) % 3);
    }
})();
