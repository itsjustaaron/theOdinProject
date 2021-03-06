const gameBoard = (function() {
    function clearBoard() {
        return new Array(length = 9);
    }

    const board = clearBoard();

    return { board, clearBoard };
})();

// this module made possible with STRONG help from:
// https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
const minimaxAI = (function () {
    class Move {
        constructor() {
            let row,col;
        }
    }

    // player1 is X, so since the AI is the only user of this algorithm,
    // we set the "player" in the algorithm to be the O
    let player = 'o', opponent = 'x';

    function isMovesLeft(board) {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if (board[i][j] == '_') {
                    return true;
                }
            }
        }

        return false;
    }

    function evaluate(b) {
        // Checks all rows for X or O victory.
        for (let row = 0; row < 3; row++) {
            if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
                if (b[row][0] == player) {
                    return +10;
                }

                else if (b[row][0] == opponent) {
                    return -10;
                }
            }
        }

        // Checks all columns for X or O victory.
        for (let col = 0; col < 3; col++) {
            if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
                if (b[0][col] == player) {
                    return +10;
                }

                else if (b[0][col] == opponent) {
                    return -10;
                }
            }
        }

        // Checking for Diagonals for X or O victory.
        if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
            if (b[0][0] == player)
                return +10;

            else if (b[0][0] == opponent)
                return -10;
        }

        if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
            if (b[0][2] == player)
                return +10;

            else if (b[0][2] == opponent)
                return -10;
        }

        // Else if none of them have
        // won then return 0
        return 0;
    }

    // This function considers all the possible ways
    // the game can go and returns the value of the board
    function minimax(board, depth, isMax) {
        let score = evaluate(board);

        // If Maximizer has won the game
        // return his/her evaluated score
        if (score == 10) {
            return score;
        }

        // If Minimizer has won the game
        // return his/her evaluated score
        if (score == -10) {
            return score;
        }

        // If there are no more moves and
        // no winner then it is a tie
        if (isMovesLeft(board) == false) {
            return 0;
        }

        // If this maximizer's move
        if (isMax) {
            let best = -1000;

            // Traverse all cells
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    // Check if cell is empty
                    if (board[i][j]=='_') {
                        // Make the move
                        board[i][j] = player;

                        // Call minimax recursively and choose the maximum value
                        best = Math.max(best, minimax(board,
                                        depth + 1, !isMax));

                        // Undo the move
                        board[i][j] = '_';
                    }
                }
            }
            return best;
        }

        // If this minimizer's move
        else {
            let best = 1000;

            // Traverse all cells
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // Check if cell is empty
                    if (board[i][j] == '_') {

                        // Make the move
                        board[i][j] = opponent;

                        // Call minimax recursively and choose the minimum value
                        best = Math.min(best, minimax(board,
                                        depth + 1, !isMax));

                        // Undo the move
                        board[i][j] = '_';
                    }
                }
            }
            return best;
        }
    }

    function findBestMove(board) {
        const startTime = Date.now();
        let bestVal = -1000;
        let bestMove = new Move();
        bestMove.row = -1;
        bestMove.col = -1;

        // Traverse all cells, evaluate minimax function for all empty
        // cells. And return the cell with optimal value.
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {

                // Check if cell is empty
                if (board[i][j] == '_') {

                    // Make the move
                    board[i][j] = player;

                    // compute evaluation function for this move.
                    let moveVal = minimax(board, 0, false);

                    // Undo the move
                    board[i][j] = '_';

                    // If the value of the current move is more than
                    // the best value, then update best
                    if (moveVal > bestVal) {
                        bestMove.row = i;
                        bestMove.col = j;
                        bestVal = moveVal;
                    }
                }
            }
        }


        console.log(`Minimax ran in ${Math.round((Date.now() - startTime) / 60)} seconds`);
        return bestMove;
    }

    return { findBestMove };
})();

const gameController = (function () {
    const $ = el => document.querySelector(el);
    const $$ = el => document.querySelectorAll(el);
    // grab any needed dom elements
    const gameTiles = $$('.game-board__tile');
    const pregameSteps = $$('.details-modal__pregame__content > div');
    const difficultyButton = $('.game-controls input[type="checkbox"]');
    const resetButton = $('.game-controls__reset');
    const modalReset = $('.details-modal__postgame__reset');
    const continueButton = $('.details-modal__pregame__continue');
    const difficultyContainer = $('.game-controls__toggle');

    // game options - TODO: refactor into object
    let setupStepTracker = 1;
    let gameIsActive = true;
    let validatingLastMove = false;
    let hardMode = false;
    let computerAsPlayer2;
    let currentPlayer;

    // wait helper function
    const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

    // used for initial testing - TODO: needs refactored now
    function renderBoard(placements) {
        gameTiles.forEach((tile, i) => tile.classList.add(`game-board__tile--${placements[i]}`));
    }

    function setUpGame() {
        gameBoard.board = gameBoard.clearBoard();
        // remove any game pieces currently on the board
        // and reset event listeners
        gameTiles.forEach(tile => {
            tile.className = 'game-board__tile';
            tile.removeEventListener('click', handleGameplay);
            tile.addEventListener('click', handleGameplay,);
        });
        // clear the canvas
        if ($('canvas')) {
            $('canvas').remove();
        }

        // reset current gameplay settings
        currentPlayer = undefined;
        computerAsPlayer2 = undefined;
        gameIsActive = true;
        validatingLastMove = false;
        setupStepTracker = 1;
        hardMode = false;

        difficultyButton.checked = false;
        difficultyContainer.classList.add('game-controls__toggle--hidden');

        // reset pregame button text
        continueButton.textContent = 'Continue';

        // remove postgame modal (if open)
        $('.details-modal').classList.remove('details-modal--open-post');
        //  make sure pregame steps are reset and open pregame modal
        pregameSteps.forEach((step, i) => {
            // we want to restart the modal at step1 every time
            i > 0 ? step.classList.add('details-modal__pregame__content--hidden') : step.classList.remove('details-modal__pregame__content--hidden');
        })
        wait(250).then(() => toggleModal());
    }

    function makeComputerPlay() {
        console.log('Ok Computer!');
        currentPlayer = player2;
        // wait briefly before playing to avoid
        // awkward timing from near-instant computer play
        wait(500).then(() => {
            const { board } = gameBoard;
            let tileToPlay;

            if (!hardMode) {
                // computer plays random legal move
                const usedTiles = board.map((el, i) => !!el ? i : null);
                const getMove = () => Math.floor(Math.random() * board.length);
                tileToPlay = getMove();
                console.log(usedTiles);
                while (usedTiles.includes(tileToPlay)) {
                    console.log(`oops - can't play at ${tileToPlay}`);
                    tileToPlay = getMove();
                    console.log(`rerolled as ${tileToPlay}`);
                }
            } else {
                // minmax algorithm
                const boardMatrix = [
                    [board[0], board[1], board[2]],
                    [board[3], board[4], board[5]],
                    [board[6], board[7], board[8]]
                ]
                .map(arr => {
                    return arr.map(el => !!el ? el : '_');
                });
                console.log(boardMatrix);
                const { row, col } = minimaxAI.findBestMove(boardMatrix);

                tileToPlay = (row * 3) + col;
            }

            const computerTile = $(`[data-position="${tileToPlay}"`);
            computerTile.classList.add('game-board__tile--o');

            board[tileToPlay] = 'o';

            return checkGameStatus(board);
        });
    }

    function toggleDifficulty(e) {
        e.stopPropagation();
        hardMode = !hardMode;
        console.log(`Hard mode has been ${hardMode ? 'enabled' : 'disabled'}`);
    }

    function toggleModal(gameOver = false) {
        const modal = $('.details-modal');

        // separate modals for pre and post game
        if (!gameOver) {
            // if we allow the modal to be closed before all necessary information
            // has been gathered, the game will not work.
            // TODO: set defaults if someone clicks out of modal

            // modal.addEventListener('click', (e) => {
            //     e.stopPropagation();

            //     if (!e.target.closest('.details-modal__pregame') || e.target.closest('.details-modal__close')) {
            //         modal.classList.remove('details-modal--open-pre');
            //     } else {
            //     }
            // });

            // // allow modal to close with escape key
            // document.body.addEventListener('keydown', (e) => {
            //     if (e.key === 'Escape') {
            //         modal.classList.remove('details-modal--open-pre');
            //     }
            // }, { once: true });

            modal.classList.add('details-modal--open-pre');
        }

        // postgame modal
        if (gameOver) {
            // if user clicks outside of modal or clicks close button, close modal
            modal.addEventListener('click', (e) => {
                e.stopPropagation();

                if (!e.target.closest('.details-modal__postgame') || e.target.closest('.details-modal__close')) {
                    modal.classList.remove('details-modal--open-post');
                } else {
                }
            });

            // allow modal to close with escape key
            document.body.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    modal.classList.remove('details-modal--open-post');
                }
            }, { once: true });

            modal.classList.add('details-modal--open-post');
        }
    }

    function drawOnBoard(lineType, offset) {
        // make sure there is no existing canvas
        if (!$('canvas')) {
            // create canvas and set dimensions to match board
            // mobile needs a smaller canvas than tablet/desktop
            const canvas = document.createElement('canvas');
            const canvasDims = document.body.clientWidth < 768 ? 270 : 450;
            canvas.width = canvasDims;
            canvas.height = canvasDims;

            let paddingOffset = +(window.getComputedStyle($('.game-board'), null).getPropertyValue('padding-left').match(/\d*/)[0]) / 2;


            // create canvas context and draw line
            // showing the path to victory
            const ctx = canvas.getContext('2d');
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';

            // create vars for x and y coordinates
            let x, y;

            // determine type and position of line to draw
            switch (lineType) {
                case 'row':
                    y = (canvasDims / 6) + ((canvasDims / 3) * offset);
                    x = paddingOffset;
                    ctx.moveTo(x, y);
                    ctx.lineTo((canvasDims - paddingOffset), y);
                    break;
                case 'col':
                    x = (canvasDims / 6) + ((canvasDims / 3) * offset);
                    y = paddingOffset;
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, (canvasDims - paddingOffset));
                    break;
                case 'tie':
                    ctx.moveTo(paddingOffset, paddingOffset);
                    ctx.lineTo((canvasDims - paddingOffset), (canvasDims - paddingOffset));
                    ctx.moveTo((canvasDims - paddingOffset), paddingOffset);
                    ctx.lineTo(paddingOffset, (canvasDims - paddingOffset));
                    break;
                default:
                    // for diagonals - determine line direction with offset
                    // (0-right or 2-left)
                    x = offset ? (canvasDims - paddingOffset) : paddingOffset;
                    y = paddingOffset;
                    ctx.moveTo(x, y);
                    // now use opposite x value for line end
                    x = offset ? paddingOffset : (canvasDims - paddingOffset);
                    ctx.lineTo(x, (canvasDims - paddingOffset));
            }

            ctx.stroke();

            const gameContainer = $('.container');
            gameContainer.insertBefore(canvas, $('.game-board'));

            // write up outcome of game
            // TODO: extract to function
            const modalContent = $('.details-modal__postgame__content');
            let modalText;

            if (lineType !== 'tie') {
                modalText = `<p class="${currentPlayer?.gamePiece}">${currentPlayer?.name} wins!</p>`;
            } else {
                modalText = `<p>It's a tie...</p>`;
            }

            modalText += `<p>Play again?</p>`;

            modalContent.innerHTML = modalText;

            // call the modal with true so it knows the game is over
            wait(750).then(() => toggleModal(true));
        }
    }

    function checkGameStatus(board) {
        if (board.filter(el => !!el).length < 5) {
            // unlock board if computer isn't playing
            if (!computerAsPlayer2 || currentPlayer.name === 'Computer') {
                validatingLastMove = false;
            }

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
            gameIsActive = false;
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
            gameIsActive = false;
            drawOnBoard('tie', 0);
            return console.log("If at first you don't succeed, tie, try again...");
        }

        // unlock board if computer isn't playing
        if (!computerAsPlayer2 || currentPlayer.name === 'Computer') {
            validatingLastMove = false;
        }

        return console.log("continue playing");
    }

    function handleGameplay(e) {
        e.stopPropagation();

        if (validatingLastMove) {
            return console.log("wait your turn!");
        }

        if (e.target.classList.length > 1) {
            return console.log("tile already in use");
        }

        validatingLastMove = true;

        const { board } = gameBoard;
        const { position } = e.target.dataset;

        currentPlayer = (currentPlayer === player2 || !currentPlayer)
        ? player1
        : player2;

        this.classList.add(`game-board__tile--${currentPlayer.gamePiece}`);

        board[position] = currentPlayer.gamePiece;
        console.log(board, currentPlayer.name);
        checkGameStatus(board);
        if (computerAsPlayer2 && gameIsActive) {
            return makeComputerPlay();
        }
    }

    function handleReset(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('resetting game');

        return setUpGame();
    }

    function handlePlayerConfiguration(e) {
        e.stopPropagation();

        // hide current step and show next step
        function cycleSteps() {
            $(`.details-modal__pregame__content--step${setupStepTracker++}`).classList.add('details-modal__pregame__content--hidden');
            $(`.details-modal__pregame__content--step${setupStepTracker}`).classList.remove('details-modal__pregame__content--hidden');
        }

        if (setupStepTracker === 1) {
            // see which game mode was selected and set options accordingly
            const gameMode = $('input[type="radio"]:checked');
            computerAsPlayer2 = gameMode.value === 'ai';
            console.log(`The computer ${computerAsPlayer2 ? 'will' : 'will not'} play as player 2`);

            if (computerAsPlayer2) {
                difficultyContainer.classList.remove('game-controls__toggle--hidden');
                continueButton.textContent = "Let's play!";
            }

            return cycleSteps();
        }

        // assign player 1
        if (setupStepTracker === 2) {
            const nameOfPlayer = $('input[name="player1"]').value;
            player1 = Player('x', nameOfPlayer);

            if (!computerAsPlayer2) {
                continueButton.textContent = "Let's play!";
                return cycleSteps();
            } else {
                player2 = Player('o', 'Computer');
            }

            // close modal for now - TODO: make a lets get started message before closing
            return this.closest('.details-modal').classList.remove('details-modal--open-pre');
        }

        // assign player 2
        if (setupStepTracker === 3) {
            const nameOfPlayer = $('input[name="player2"]').value;
            player2 = Player('o', nameOfPlayer);

            return this.closest('.details-modal').classList.remove('details-modal--open-pre');
        }
    }

    resetButton.addEventListener('click', handleReset);
    modalReset.addEventListener('click', handleReset);
    continueButton.addEventListener('click', handlePlayerConfiguration);
    difficultyButton.addEventListener('click', toggleDifficulty);

    return { renderBoard, drawOnBoard, setUpGame };
})();

// need a player factory
function Player(marker, playerName) {
    const gamePiece = marker;
    const name = playerName ? playerName : `Player ${gamePiece.toUpperCase()}`;
    return { gamePiece, name };
}

// global logic
// const player1 = Player('x');
// const player2 = Player('o');
let player1, player2;
gameController.setUpGame();