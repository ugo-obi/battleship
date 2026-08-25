
import "./styles.css";
import createPlayer from "./factories/Player.js";
import renderBoard, { addBoardClickHandler } from "./dom/domController.js";

const boardContainer = document.getElementById("app");
renderBoard(boardContainer);

addBoardClickHandler(boardContainer, (coord) => {
    console.log("Clicked:", coord);
});

const player1 = createPlayer("real");
const player2 = createPlayer("computer");

console.log(player1);
console.log(player2);

