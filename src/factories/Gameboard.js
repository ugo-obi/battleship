
function createGameboard() {
    const ships = [];
    const missedAttacks = [];
    const attackedCoords = [];

     function placeShip(ship, coordinates) {
        ships.push({ ship, coordinates });
    }

    function getShipAt(coord) {
        const found = ships.find(({ coordinates }) =>
        coordinates.some(([x, y]) => x === coord[0] && y === coord[1])
        );
        return found ? found.ship : null;
    }

    function wasAttacked(coord) {
        return attackedCoords.some(([x, y]) => x === coord[0] && y === coord[1]);
    }
   
    function receiveAttack(coord) {
        
        if (wasAttacked(coord)) return;
        attackedCoords.push(coord);
        const ship = getShipAt(coord);
        if (ship) {
            ship.hit();
        } else {
            missedAttacks.push(coord);
        }
    }

    function allShipsSunk() {
        return ships.every(({ ship }) => ship.isSunk());
    }

    return { placeShip, getShipAt, receiveAttack, allShipsSunk, wasAttacked, missedAttacks };
}

export default createGameboard;