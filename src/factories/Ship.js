
function createShip(length, name) {
    let hits = 0;

    return {
        length,
        name,
        get hits() {
            return hits;
        },
        hit() {
            hits++;
        },
        isSunk() {
            return hits >= length;
        },
    };
 }


 export default createShip;