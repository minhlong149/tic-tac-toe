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
  const main = document.querySelector("main");
  main.textContent = "";
  // Add HTML game board
});
