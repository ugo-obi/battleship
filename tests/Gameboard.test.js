
import createGameboard from '../src/factories/Gameboard.js';
import createShip from '../src/factories/Ship.js';

test("placeShip places a ship at given coordinates", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);

    expect(gameboard.getShipAt([0, 0])).toBe(ship);
});
