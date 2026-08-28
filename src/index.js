import "./styles.css";
import createPlayer from "./factories/Player.js";
import renderBoard, { addBoardClickHandler, markCell } from "./dom/domController.js";
import createShip from "./factories/Ship.js";

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

function getShipCoordinates(length, gameboard) {
    let coordinates;
    let valid = false;

    while (!valid) {
        const startX = Math.floor(Math.random() * 10);
        const startY = Math.floor(Math.random() * 10);
        const isHorizontal = Math.random() < 0.5;

        coordinates = [];
        for (let i = 0; i < length; i += 1) {
            const x = isHorizontal ? startX + i : startX;
            const y = isHorizontal ? startY : startY + i;
            coordinates.push([x, y]);
        }

        const inBounds = coordinates.every(([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10);
        const noOverlap = coordinates.every(([x, y]) => !gameboard.getShipAt([x, y]));

        valid = inBounds && noOverlap;
    }

    return coordinates;
}

function placeRandomShips(player) {
    const carrier = createShip(5, 'Carrier');
    const battleship = createShip(4, 'Battleship');
    const destroyer = createShip(3, 'Destroyer');

    [carrier, battleship, destroyer].forEach((ship) => {
        const coords = getShipCoordinates(ship.length, player.gameboard);
        player.gameboard.placeShip(ship, coords);
    });
}

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

// --- Manual placement for player1 ---

const shipsToPlace = [
    { length: 5, name: 'Carrier' },
    { length: 4, name: 'Battleship' },
    { length: 3, name: 'Destroyer' },
];
let placingIndex = 0;
let orientation = 'horizontal';

function getManualCoordinates(startX, startY, length, orient) {
    const coordinates = [];
    for (let i = 0; i < length; i += 1) {
        const x = orient === 'horizontal' ? startX + i : startX;
        const y = orient === 'horizontal' ? startY : startY + i;
        coordinates.push([x, y]);
    }
    return coordinates;
}

function isValidPlacement(coordinates, gameboard) {
    const inBounds = coordinates.every(([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10);
    const noOverlap = coordinates.every(([x, y]) => !gameboard.getShipAt([x, y]));
    return inBounds && noOverlap;
}

function startGame() {
    placeRandomShips(player2);
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
}

renderBoard(playerBoardContainer, player1.gameboard, true);
renderStagingArea();

playerBoardContainer.addEventListener('drop', (event) => {
    event.preventDefault();
    const cell = event.target.closest('.cell');
    if (!cell) return;

    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    const shipIndex = Number(event.dataTransfer.getData('text/plain'));

    if (shipIndex !== placingIndex) return;

    const { length, name } = shipsToPlace[placingIndex];
    const coordinates = getManualCoordinates(x, y, length, orientation);

    if (!isValidPlacement(coordinates, player1.gameboard)) {
        alert('Invalid placement');
        return;
    }

    const ship = createShip(length, name);
    player1.gameboard.placeShip(ship, coordinates);
    renderBoard(playerBoardContainer, player1.gameboard, true);

    placingIndex += 1;
    renderStagingArea();

    if (placingIndex === shipsToPlace.length) {
        startGame();
    }
});


document.getElementById('rotate-btn').addEventListener('click', () => {
    orientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
    renderStagingArea();
});

function renderStagingArea() {
    const staging = document.getElementById('ship-staging');
    staging.innerHTML = '';

    shipsToPlace.slice(placingIndex).forEach((shipDef, i) => {
        const shipEl = document.createElement('div');
        shipEl.classList.add('ship-piece');
        if (orientation === 'vertical') shipEl.classList.add('vertical');
        shipEl.draggable = true;
        shipEl.dataset.shipIndex = placingIndex + i;

        for (let s = 0; s < shipDef.length; s += 1) {
            const segment = document.createElement('div');
            segment.classList.add('segment');
            shipEl.appendChild(segment);
        }

        shipEl.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', shipEl.dataset.shipIndex);
        });

        staging.appendChild(shipEl);
    });
}