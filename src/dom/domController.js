
function renderBoard(container) {
    container.innerHTML = "";
    container.classList.add("board");

    for (let y = 0; y < 10; y += 1) {
        for (let x = 0; x < 10; x += 1) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            container.appendChild(cell);
        }
    }
}

function addBoardClickHandler(container, callback) {
    container.addEventListener("click", (event) => {
        const cell = event.target.closest(".cell");
        if (!cell) return;

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);
        callback([x, y]);
    });
}

function markCell(container, coord, result) {
    const [x, y] = coord;
    const cell = container.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    if (!cell) return;

    cell.classList.add(result === `hit` ? `hit` : `miss`);
}

export default renderBoard;
export { addBoardClickHandler, markCell };