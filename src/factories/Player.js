
import createGameboard from "./Gameboard.js"

function createPlayer(type = "real") {
    const gameboard = createGameboard();

    function attack(enemyGameboard,coord) {
        enemyGameboard.receiveAttack(coord);
    }

    function randomAttack(enemyGameboard) {
        let coord;
        do {
            coord = [
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10 ),
            ];
        } while (enemyGameboard.wasAttacked(coord));

        enemyGameboard.receiveAttack(coord);
        return coord;
    }

    return { type, gameboard, attack, randomAttack };
}

export default createPlayer;