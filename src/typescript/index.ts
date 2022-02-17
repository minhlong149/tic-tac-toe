import { TicTacToe } from "./gamePlay.js";

const playBoard = `
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
`;

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

let gameRecord: Array<TicTacToe> = [];

/**
 * USER SELECT THEIR MARK & CHOOSE AN OPPONENT
 */

const buttonX = document.querySelector("#btnX");
const buttonO = document.querySelector("#btnO");
const imageX = buttonX.querySelector("#imgX") as HTMLImageElement;
const imageO = buttonO.querySelector("#imgO") as HTMLImageElement;

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

const buttonCPU = document.querySelector("#btnUser");
buttonCPU.addEventListener("click", () => {
  let newGame = buttonX.classList.contains("choice__btn--pick")
    ? new TicTacToe("x", "o")
    : new TicTacToe("o", "x");

  // Create HTML game board
  const main = document.querySelector("main");
  main.innerHTML = playBoard;

  // Update score mark
  const userScore = document.querySelector(".score--user");
  const userMark = userScore.querySelector(".score__player");
  userMark.textContent += ` (${newGame.user.mark})`;
  // const userScorePoint = userScore.querySelector(".score__score");
  // userScorePoint.textContent = `${newGame.user.getScore()}`;

  const opponentScore = document.querySelector(".score--opponent");
  const opponentMark = opponentScore.querySelector(".score__player");
  opponentMark.textContent += ` (${newGame.opponent.mark})`;

  // Player make a move
  const boardChoices = document.querySelectorAll(".board__choice");
  boardChoices.forEach((button) => {
    const buttonIndex = getButtonIndex(button);
    button.addEventListener("click", () => {
      if (newGame.movable(buttonIndex[0], buttonIndex[1])) {
        // Update move
        button.innerHTML = `<img src="../../assets/images/icon-${newGame.playerTurn.mark}.svg">`; //
        newGame.move(buttonIndex[0], buttonIndex[1]);

        if (newGame.winner) {
          // Announced winner
          gameRecord.push(newGame)
          console.log(gameRecord);

          // Printout HTML
        } else {
          // Switch turn icon
          const turnIcon = document.querySelector(
            ".turn__icon"
          ) as HTMLImageElement;
          turnIcon.src = `./assets/images/icon-${newGame.playerTurn.mark}-gray.svg`;
        }
      }
    });
  });

  // Reset button
  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", () => {
    if (!newGame.winner) {
      newGame.resetGameBoard();
      const choicePick = document.querySelectorAll(".board__choice");
      choicePick.forEach((choice) => {
        choice.textContent = "";
      });
      const turnIcon = document.querySelector(
        ".turn__icon"
      ) as HTMLImageElement;
      turnIcon.src = `./assets/images/icon-${newGame.playerTurn.mark}-gray.svg`;
    }
  });
});
