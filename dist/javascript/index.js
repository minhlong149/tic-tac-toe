import { TicTacToe } from "./gamePlay.js";
const choicePickHTML = `
  <main>
    <header>
      <div class="logo-container"><img class="logo" src="./assets/images/logo.svg" alt="logo"></div>
    </header>

    <div class="choice">
      <p class="choice__desc">Pick player's mark</p>
      <div class="choice__pick">
        <button id="btnX" class="choice__btn choice__btn--pick"><img id="imgX" src="./assets/images/icon-x-dark.svg" alt="o" height="60px"
            width="60px"></button>
        <button id="btnO"class="choice__btn"><img id="imgO"src="./assets/images/icon-o-gray.svg" alt="x" height="60px"
            width="60px"></button>
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
        <div class="score__player">You</div>
        <div class="score__score">0</div>
      </div>
      <div class="score__btn score--ties">
        <div class="score__player">Ties</div>
        <div class="score__score">0</div>
      </div>
      <div class="score__btn score--opponent">
        <div class="score__player">CPU</div>
        <div class="score__score">0</div>
      </div>
    </div>
  </main>
`;
/**
 * USER SELECT THEIR MARK & CHOOSE AN OPPONENT
 */
function choicePick() {
    // Reset play board HTMl
    const body = document.querySelector("body");
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
                    ? "../../assets/images/icon-x-dark.svg"
                    : "../../assets/images/icon-x-gray.svg";
                imageO.src = buttonO.classList.contains("choice__btn--pick")
                    ? "../../assets/images/icon-o-dark.svg"
                    : "../../assets/images/icon-o-gray.svg";
            }
        });
    });
    /**
     * PLAY WITH ANOTHER USER
     */
    function playWithPlayer() {
        let newGame = buttonX.classList.contains("choice__btn--pick")
            ? new TicTacToe("x", "o")
            : new TicTacToe("o", "x");
        // Create HTML game board
        const main = document.querySelector("main");
        main.innerHTML = playBoardHTML;
        const userScore = document.querySelector(".score--user");
        const opponentScore = document.querySelector(".score--opponent");
        const userMark = userScore.querySelector(".score__player");
        userMark.textContent += ` (${newGame.user.mark})`;
        const opponentMark = opponentScore.querySelector(".score__player");
        opponentMark.textContent += ` (${newGame.opponent.mark})`;
        function resetBoard(game) {
            game.resetGameBoard();
            // Set turn icon to x
            const turnIcon = document.querySelector(".turn__icon");
            turnIcon.src = `./assets/images/icon-x-gray.svg`;
            // Empty board choices
            const choicePick = document.querySelectorAll(".board__choice");
            choicePick.forEach((choice) => {
                choice.innerHTML = "";
            });
            // Update scoreboard
            const userScorePoint = userScore.querySelector(".score__score");
            userScorePoint.textContent = `${game.user.getScore()}`;
            const opponentScorePoint = opponentScore.querySelector(".score__score");
            opponentScorePoint.textContent = `${game.opponent.getScore()}`;
        }
        function getButtonIndex(button) {
            switch (button.id) {
                case "0":
                    return [0, 0];
                case "1":
                    return [0, 1];
                case "2":
                    return [0, 2];
                case "3":
                    return [1, 0];
                case "4":
                    return [1, 1];
                case "5":
                    return [1, 2];
                case "6":
                    return [2, 0];
                case "7":
                    return [2, 1];
                case "8":
                    return [2, 2];
            }
        }
        resetBoard(newGame);
        // Player make a move
        const boardChoices = document.querySelectorAll(".board__choice");
        boardChoices.forEach((button) => {
            const buttonIndex = getButtonIndex(button);
            button.addEventListener("click", () => {
                if (newGame.movable(buttonIndex[0], buttonIndex[1])) {
                    // Update move
                    button.innerHTML = `<img src="../../assets/images/icon-${newGame.playerTurn.mark}.svg">`; //
                    newGame.move(buttonIndex[0], buttonIndex[1]);
                    if (newGame.foundWinner()) {
                        // Announce result
                        const announcedHTML = `
              <div class="announced">
                <div class="announced__state">You ${newGame.winner == newGame.user ? "win" : "lose"}!</div>
                <div class="announced__winner">
                  <img src="./assets/images/icon-${newGame.winner.mark}.svg" alt="">
                  <span class="winner-${newGame.winner.mark}">take the round</span>
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
                            resetBoard(newGame);
                            announced.remove();
                        });
                        // Quit game
                        const quit = document.querySelector("#quit");
                        quit.addEventListener("click", () => {
                            choicePick();
                        });
                    }
                    else {
                        // Switch turn icon
                        const turnIcon = document.querySelector(".turn__icon");
                        turnIcon.src = `./assets/images/icon-${newGame.playerTurn.mark}-gray.svg`;
                    }
                }
            });
        });
        // Reset board in-game
        const resetButton = document.querySelector(".reset");
        resetButton.addEventListener("click", () => {
            resetBoard(newGame);
            console.log(newGame);
        });
    }
    const buttonCPU = document.querySelector("#btnUser");
    buttonCPU.addEventListener("click", playWithPlayer);
}
choicePick();
