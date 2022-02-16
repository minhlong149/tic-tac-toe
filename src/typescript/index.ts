import { Player } from "./gamePlay.js";
// const Player = require("./gamePlay");

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

const playBoard = `
  <header>
    <img class="logo" src="./assets/images/logo.svg" alt="logo">
    <div class="turn">
      <img src="./assets/images/icon-x-gray.svg" width="20px" alt="player-turn-icon">
      <span>Turn</span>
    </div>
    <button class="reset"><img src="./assets/images/icon-restart.svg" alt="reset-icon"></button>
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

let user: Player;
let opponent: Player;
// let newGame = new TicTacToe();

const buttonCPU = document.querySelector("#btnCPU");
buttonCPU.addEventListener("click", () => {
  if (buttonX.classList.contains("choice__btn--pick")) {
    // user pick X
    user = new Player("x");
    opponent = new Player("o");
  } else {
    // user pink O
    user = new Player("o");
    opponent = new Player("x");
  }
  console.log({ user, opponent });

  // Change HTML
  const main = document.querySelector("main");
  main.innerHTML = playBoard;
  // Add HTML game board
});
