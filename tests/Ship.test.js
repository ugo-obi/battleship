import createGameboard from '../src/factories/Gameboard.js';
import createShip from '../src/factories/Ship.js';

test("ship has a length", () => {
    const ship = createShip(3);
    expect(ship.length).toBe(3);
});

test("hit() increases the number of hits", () => {
    const ship = createShip(3);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test("isSunk() returns false if hits are less than length", () => {
    const ship = createShip(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
});

test("isSunk() returns true if hits are equal to length", () => {
    const ship = createShip(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test("receiveAttack() records a hit on the ship if the coordinates match", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
    gameboard.receiveAttack([0, 1]);
    expect(ship.hits).toBe(1);
});

test("receiveAttack() records a miss if the coordinates do not match any ship", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
    gameboard.receiveAttack([1, 1]);
    expect(gameboard.missedAttacks).toContainEqual([1, 1]);
});

test('receiveAttack() does not hit a ship when attacking an empty coordinate', () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
    gameboard.receiveAttack([1, 1]);
    expect(ship.hits).toBe(0);
});

test("receiveAttack() does not allow attacking the same coordinate twice", () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([0, 1]); // Attack the same coordinate again
    expect(ship.hits).toBe(1); // Hits should still be 1
});

test("allShipsSunk() returns true if all ships are sunk", () => {
    const gameboard = createGameboard();
    const ship = createShip(2);
    gameboard.placeShip(ship, [[0, 0], [0, 1]]);
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    expect(gameboard.allShipsSunk()).toBe(true);
});

test("allShipsSunk() returns false if at least one ship is not sunk", () => {
    const gameboard = createGameboard();
    const ship = createShip(2);
    gameboard.placeShip(ship, [[0, 0], [0, 1]]);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.allShipsSunk()).toBe(false);
});