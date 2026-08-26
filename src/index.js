
import "./styles.css";
import createPlayer from "./factories/Player.js";
import renderBoard, { addBoardClickHandler, markCell  } from "./dom/domController.js";
import createShip from "./factories/Ship.js";

const boardContainer = document.getElementById("app");
const playerBoardContainer = document.getElementById('player-board');
const computerBoardContainer = document.getElementById('computer-board');


const player1 = createPlayer("real");
const player2 = createPlayer("computer");
let currentTurn = 'player1';
let gameOver = false;

function placeDefaultShips(player) {
    const carrier = createShip(5, 'Carrier');
    const battleship = createShip(4, 'Battleship');
    const destroyer = createShip(3, 'Destroyer');

    player.gameboard.placeShip(carrier, [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
    player.gameboard.placeShip(battleship, [[2, 0], [2, 1], [2, 2], [2, 3]]);
    player.gameboard.placeShip(destroyer, [[4, 0], [4, 1], [4, 2]]);
}

placeDefaultShips(player1);
placeDefaultShips(player2);


function computerTurn() {
    const coord = player2.randomAttack(player1.gameboard);
    const ship = player1.gameboard.getShipAt(coord);
    const result = ship ? 'hit' : 'miss';
    markCell(playerBoardContainer, coord, result);
    currentTurn = 'player1';

    if (player1.gameboard.allShipsSunk()) {
        gameOver = true;
        alert('Computer wins! All your ships have been sunk');
        return;
    }
}

renderBoard(playerBoardContainer, player1.gameboard, true);
renderBoard(computerBoardContainer, player2.gameboard, false);


addBoardClickHandler(computerBoardContainer, (coord) => {
    if (gameOver) return;
    if (currentTurn !== 'player1') return;
    if (player2.gameboard.wasAttacked(coord)) return;

    const shipBefore = player2.gameboard.getShipAt(coord);
    player1.attack(player2.gameboard, coord);

    const result = shipBefore ? 'hit' : 'miss';
    markCell(computerBoardContainer, coord, result);

    if (player2.gameboard.allShipsSunk()) {
        gameOver = true;
        alert('You win! All enemy ships have been sunk.');
        return;
    }

    currentTurn = 'player2';
    setTimeout(computerTurn, 500);
});


console.log(player1);
console.log(player2);

