
import createGameboard from "./Gameboard.js"

function createPlayer(type = "real") {
    const gameboard = createGameboard();
    let huntQueue = [];

    function attack(enemyGameboard,coord) {
        enemyGameboard.receiveAttack(coord);
    }

    function getNeighbors([x, y]) {
        return [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
        ].filter(([nx, ny]) => nx >= 0 && nx < 10 && ny >= 0 && ny < 10);
    } 

    function randomAttack(enemyGameboard) {
        let coord;

        if (huntQueue.length > 0) {
            coord = huntQueue.shift();
            if (enemyGameboard.wasAttacked(coord)) {
                return randomAttack(enemyGameboard);
            }
        } else {
            do {
            coord = [
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10 ),
            ];
        } while (enemyGameboard.wasAttacked(coord));
    }
  
    enemyGameboard.receiveAttack(coord);

    if (enemyGameboard.getShipAt(coord)) {
        huntQueue.push(...getNeighbors(coord));
    }
        return coord;
    }

    return { type, gameboard, attack, randomAttack };
}

export default createPlayer;