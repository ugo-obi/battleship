
function createShip(length) {
    let hits = 0;

    return {
        length,
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