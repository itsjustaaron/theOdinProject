// need a game board module
const gameBoard = (function() {
    // write all game board logic here
    // return anything that needs to be accessed
    function clearBoard() {
        return new Array(length = 9);
    }

    const board = clearBoard();

    return { board, clearBoard };
})();

// need a game controller module
const gameController = (function () {
    // grab any needed dom elements
    const gameTiles = document.querySelectorAll('.game-board__tile');
    const pregameSteps = document.querySelectorAll('.details-modal__pregame__content > div');
    const resetButton = document.querySelector('.game-controls__reset');
    const modalReset = document.querySelector('.details-modal__postgame__reset');
    const continueButton = document.querySelector('.details-modal__pregame__continue');

    // game options - TODO: refactor into object
    let setupStepTracker = 1;
    let gameIsActive = true;
    let validatingLastMove = false;
    let computerAsPlayer2;
    let currentPlayer;

    // wait helper function
    const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

    // need a function to render the
    // game board to the dom
    function renderBoard(placements) {
        // console.log(placements);
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
        if (document.querySelector('canvas')) {
            document.querySelector('canvas').remove();
        }
        // reset current gameplay settings
        currentPlayer = undefined;
        computerAsPlayer2 = undefined;
        gameIsActive = true;
        validatingLastMove = false;
        setupStepTracker = 1;

        // reset pregame button text
        continueButton.textContent = 'Continue';

        // remove postgame modal (if open)
        document.querySelector('.details-modal').classList.remove('details-modal--open-post');
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
        // wait a second before playing to avoid
        // awkward timing from instant computer play
        wait(1000).then(() => {
            const { board } = gameBoard;
            const usedTiles = board.map((el, i) => !!el ? i : null);
            const getMove = () => Math.floor(Math.random() * board.length);
            let tileToPlay = getMove();
            while (usedTiles.includes(tileToPlay)) {
                console.log(`oops - can't play at ${tileToPlay}`);
                tileToPlay = getMove();
                console.log(`rerolled as ${tileToPlay}`);
            }

            if (!usedTiles.includes(tileToPlay)) {
                const computerTile = document.querySelector(`[data-position="${tileToPlay}"`);
                computerTile.classList.add('game-board__tile--o');

                board[tileToPlay] = 'o';

                return checkGameStatus(board);
            }
        });
    }

    function toggleModal(gameOver = false) {
        const modal = document.querySelector('.details-modal');

        // separate modals for pre and post game
        // TODO: set class in variable and combine blocks to avoid repetition
        if (!gameOver) {
            modal.addEventListener('click', (e) => {
                e.stopPropagation();

                if (!e.target.closest('.details-modal__pregame') || e.target.closest('.details-modal__close')) {
                    console.log('Clicked outside of the modal - modal will close');
                    modal.classList.remove('details-modal--open-pre');
                } else {
                    console.log('Clicked inside the modal - modal will not close');
                }
            });

            // allow modal to close with escape key
            document.body.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    modal.classList.remove('details-modal--open-pre');
                }
            }, { once: true });

            modal.classList.add('details-modal--open-pre');
        }

        // postgame modal
        if (gameOver) {
            // if user clicks outside of modal or clicks close button, close modal
            modal.addEventListener('click', (e) => {
                e.stopPropagation();

                if (!e.target.closest('.details-modal__postgame') || e.target.closest('.details-modal__close')) {
                    console.log('Clicked outside of the modal - modal will close');
                    modal.classList.remove('details-modal--open-post');
                } else {
                    console.log('Clicked inside the modal - modal will not close');
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
            const modalContent = document.querySelector('.details-modal__postgame__content');
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
            return console.log("tile already in use", this);
        }

        validatingLastMove = true;

        const { position } = e.target.dataset;

        currentPlayer = (currentPlayer === player2 || !currentPlayer)
        ? player1
        : player2;

        this.classList.add(`game-board__tile--${currentPlayer.gamePiece}`);

        gameBoard.board[position] = currentPlayer.gamePiece;
        console.log(gameBoard.board, currentPlayer.name);
        checkGameStatus(gameBoard.board);
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
        console.log(this);
        console.log(`Alright kids, we're on step ${setupStepTracker}`);

        // hide current step and show next step
        function cycleSteps() {
            document.querySelector(`.details-modal__pregame__content--step${setupStepTracker++}`).classList.add('details-modal__pregame__content--hidden');
            document.querySelector(`.details-modal__pregame__content--step${setupStepTracker}`).classList.remove('details-modal__pregame__content--hidden');
        }

        if (setupStepTracker === 1) {
            // see which game mode was selected and set options accordingly
            const gameMode = document.querySelector('input[type="radio"]:checked');
            computerAsPlayer2 = gameMode.value === 'ai';
            console.log(`The computer ${computerAsPlayer2 ? 'will' : 'will not'} play as player 2`);

            if (computerAsPlayer2) {
                continueButton.textContent = "Let's play!";
            }

            return cycleSteps();
        }

        // assign player 1
        if (setupStepTracker === 2) {
            const nameOfPlayer = document.querySelector('input[name="player1"]').value;
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
            const nameOfPlayer = document.querySelector('input[name="player2"]').value;
            player2 = Player('o', nameOfPlayer);

            return this.closest('.details-modal').classList.remove('details-modal--open-pre');
        }
    }

    resetButton.addEventListener('click', handleReset);
    modalReset.addEventListener('click', handleReset);
    continueButton.addEventListener('click', handlePlayerConfiguration);

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