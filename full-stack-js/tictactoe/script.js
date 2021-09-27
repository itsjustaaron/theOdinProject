// need a game board module
const gameBoard = (function() {
    // write all game board logic here
    // return anything that needs to be accessed
    const board = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
    return { board };
})();

// need a dom controller module
const displayController = (function () {
    // dom manipulation logic
    const gameTiles = document.querySelectorAll('.game-board__tile');

    // need a function to render the
    // game board to the dom
    function renderBoard(placements) {
        // console.log(placements);
        gameTiles.forEach((tile, i) => tile.classList.add(`game-board__tile--${placements[i]}`));
    }

    // gameTiles.forEach(tile => tile.addEventListener('click', () => {
    //     console.log(this);
    //     console.dir(this);
    //     if (this.classList.length > 1) {
    //         console.log("tile already in use");
    //     }
    // }));

    return { renderBoard };
})();

displayController.renderBoard(gameBoard.board);

// need a player factory
function Player(marker) {}

// global logic
