// need a game board module
const gameBoard = (function() {
    // write all game board logic here
    // return anything that needs to be accessed
    function clearBoard() {
        return new Array(length = 9);
    }

    const board = clearBoard();

    // should game status be checked here or in controller?

    return { board, clearBoard };
})();

// need a game controller module
const gameController = (function () {
    // dom manipulation logic
    const gameTiles = document.querySelectorAll('.game-board__tile');
    const resetButton = document.querySelector('.game-controls__reset');
    const modalReset = document.querySelector('.postgame-modal__dialog__reset');
    let currentPlayer;

    // wait helper function
    const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

    // need a function to render the
    // game board to the dom
    function renderBoard(placements) {
        // console.log(placements);
        gameTiles.forEach((tile, i) => tile.classList.add(`game-board__tile--${placements[i]}`));
    }

    function toggleModal() {
        // hard code opening for now
        const modal = document.querySelector('.postgame-modal');

        // if user clicks outside of modal or clicks close button, close modal
        modal.addEventListener('click', (e) => {
            e.stopPropagation();

            if (!e.target.closest('.postgame-modal__dialog') || e.target.closest('.postgame-modal__close')) {
                console.log('Clicked outside of the modal - modal will close');
                modal.classList.remove('postgame-modal--open');
            } else {
                console.log('Clicked inside the modal - modal will not close');
            }
        });

        // allow modal to close with escape key
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('postgame-modal--open');
            }
        }, { once: true });

        modal.classList.add('postgame-modal--open');
    }

    function drawOnBoard(lineType, offset) {
        // if no canvas exists in the dom
        if (!document.querySelector('canvas')) {
            // create canvas and set dimensions to match board
            const canvas = document.createElement('canvas');
            canvas.width = 450;
            canvas.height = 450;

            // create canvas context and draw line
            // showing the path to victory
            const ctx = canvas.getContext('2d');
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';

            // create vars for x and y coordinates
            let x, y;

            // determine type and position of line to draw
            console.log(lineType, offset);

            switch (lineType) {
                case 'row':
                    y = 75 + (150 * offset);
                    x = 10;
                    ctx.moveTo(x, y);
                    ctx.lineTo(440, y);
                    break;
                case 'col':
                    x = 75 + (150 * offset);
                    y = 10;
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, 440);
                    break;
                case 'tie':
                    ctx.moveTo(10, 10);
                    ctx.lineTo(440, 440);
                    ctx.moveTo(440, 10);
                    ctx.lineTo(10, 440);
                    break;
                default:
                    // for diagonals - determine line direction with offset
                    // (0-right or 2-left)
                    x = offset ? 440 : 10;
                    y = 10;
                    ctx.moveTo(x, y);
                    // now use opposite x value for line end
                    x = offset ? 10 : 440;
                    ctx.lineTo(x, 440);
            }

            ctx.stroke();

            const gameContainer = document.querySelector('.container');
            gameContainer.insertBefore(canvas, document.querySelector('.game-board'));

            // write up outcome of game
            // TODO: extract to function
            const modalContent = document.querySelector('.postgame-modal__dialog__content');
            let modalText;

            if (lineType !== 'tie') {
                modalText = `<p class="${currentPlayer?.marker}">${currentPlayer?.name} wins!</p>`;
            } else {
                modalText = `<p>It's a tie...</p>`;
            }

            modalText += `<p>Play again?</p>`;

            modalContent.innerHTML = modalText;

            wait(1500).then(() => toggleModal());
        }
    }

    function checkGameStatus(board) {
        if (board.filter(el => !!el).length < 5) {
            return console.log("Not enough placements to win");
        }

        const row1 = [board[0], board[1], board[2]];
        const row2 = [board[3], board[4], board[5]];
        const row3 = [board[6], board[7], board[8]];
        const col1 = [board[0], board[3], board[6]];
        const col2 = [board[1], board[4], board[7]];
        const col3 = [board[2], board[5], board[8]];
        const dia1 = [board[0], board[4], board[8]];
        const dia2 = [board[2], board[4], board[6]];

        const winningPlacements = [row1, row2, row3, col1, col2, col3, dia1, dia2];
        const winner = winningPlacements.find(arr => arr[0] === arr[1] && arr[1] === arr[2] && !!arr[0]);

        if (winner) {
            const winPosition = winningPlacements.findIndex(el => el === winner);
            // set starting line based on where game was won
            const lineStart = [0, 3, 6].includes(winPosition) ? 0 : [1, 4].includes(winPosition)
                ? 1 : 2;

            // determine win type based on winning array's
            // location (index) in placements array
            let winType;

            switch (winPosition) {
                case 0:
                case 1:
                case 2:
                    winType = 'row';
                    break;
                case 3:
                case 4:
                case 5:
                    winType = 'col';
                    break;
                default:
                    winType = 'dia';
                    break;
            }

            Object.freeze(board);
            drawOnBoard(winType, lineStart);
            return console.log(`Game over! ${currentPlayer.name} wins!`);
        }

        if (!winner && board.filter(el => !!el).length === 9) {
            // It's a tie!
            drawOnBoard('tie', 0);
            return console.log("If at first you don't succeed, tie, try again...");
        }

        return console.log("continue playing");
    }

    function handleGameplay(e) {
        e.stopPropagation();

        currentPlayer = (currentPlayer === player2 || !currentPlayer) ? player1 : player2;

        const { position } = e.target.dataset;
        if (this.classList.length > 1) {
            return console.log("tile already in use", this);
        }

        this.classList.add(`game-board__tile--${currentPlayer.gamePiece}`);

        gameBoard.board[position] = currentPlayer.gamePiece;
        console.log(gameBoard.board, currentPlayer.name);
        checkGameStatus(gameBoard.board);
    }

    function handleReset(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('resetting game');

        gameBoard.board = gameBoard.clearBoard();
        // remove any game pieces currently on the board
        gameTiles.forEach(tile => tile.className = 'game-board__tile');
        // clear the canvas
        if (document.querySelector('canvas')) {
            document.querySelector('canvas').remove();
        }
        // clear current player setting
        currentPlayer = undefined;
        // hide modal
        document.querySelector('.postgame-modal').classList.remove('postgame-modal--open');
    }

    resetButton.addEventListener('click', handleReset);
    modalReset.addEventListener('click', handleReset);

    // gameTiles.forEach(tile => tile.addEventListener('click', handleGameplay, {once: true}));
    gameTiles.forEach(tile => tile.addEventListener('click', handleGameplay));
        // console.log(this);
        // console.dir(this);
        // if (this.classList.length > 1) {
        //     console.log("tile already in use");
    //     // }
    // }));

    return { renderBoard, drawOnBoard };
})();

// gameController.renderBoard(gameBoard.board);

// need a player factory
function Player(marker, playerName) {
    // player factory logic
    const gamePiece = marker;
    const name = playerName ? playerName : `Player ${gamePiece.toUpperCase()}`;
    return { gamePiece, name };
}

// global logic
const player1 = Player('x');
const player2 = Player('o');