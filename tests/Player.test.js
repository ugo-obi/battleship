
import createPlayer from "../src/factories/Player.js";
import createGameboard from "../src/factories/Gameboard.js";

test("player has a type", () => {
    const player = createPlayer("real");
    expect(player.type).toBe('real');
});

test("player has its own gameboard", () => {
    const player = createPlayer();
    expect(player.gameboard).toBeDefined();
});

test("randomAttack never attacks the same coordinatestwice across many calls", () => {
    const player = createPlayer("computer");
    const enemyGameboard = createGameboard();
    const attacked = new Set();

    for (let i = 0; i < 50; i += 1) {
        const coord = player.randomAttack(enemyGameboard);
        const key = coord.join(",");
        expect(attacked.has(key)).toBe(false);
        attacked.add(key);
    }
});