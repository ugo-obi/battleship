
import "./styles.css";
import createPlayer from "./factories/Player.js";
import renderBoard, { addBoardClickHandler, markCell  } from "./dom/domController.js";
import createShip from "./factories/Ship.js";

const boardContainer = document.getElementById("app");

const player1 = createPlayer("real");
const player2 = createPlayer("computer");

function placeDefaultShips(player) {
    const carrier = createShip(5);
    const battleship = createShip(4);
    const destroyer = createShip(3);

    player.gameboard.placeShip(carrier, [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
    player.gameboard.placeShip(battleship, [[2, 0], [2, 1], [2, 2], [2, 3]]);
    player.gameboard.placeShip(destroyer, [[4, 0], [4, 1], [4, 2]]);
}

placeDefaultShips(player1);
placeDefaultShips(player2);

renderBoard(boardContainer);


addBoardClickHandler(boardContainer, (coord) => {
    if (player2.gameboard.wasAttacked(coord)) return;

    const shipBefore = player2.gameboard.getShipAt(coord);
    player1.attack(player2.gameboard, coord);

    const result = shipBefore ? 'hit' : 'miss';
    markCell(boardContainer, coord, result); 
});


console.log(player1);
console.log(player2);

