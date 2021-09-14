// rock paper scissors
const options = ['rock', 'paper', 'scissors'];
const resultsContainer = document.querySelector('.results');
const buttons = document.querySelectorAll('.game-buttons button');
const resetButton = document.querySelector('.reset');
let playerScore = 0;
let computerScore = 0;

// need function to emualate computer player's action
function computerPlay() {
  const randomNumber = Math.floor(options.length * Math.random());
  return options[randomNumber];
}

// need function to compare user's action to computer's action
// function should accept case-insensitive arguments
// return a string that declares the winner: "You win! Rock beats scissors!"
function playRound(playerAction, computerAction) {
  if (playerScore < 5 && computerScore < 5) {
    const roundResults = document.createElement('p');
    // compare user inputs
    if (playerAction === computerAction) {
      // unclear on draws - currently gives no points
      roundResults.textContent = "It's a draw!";
    } else if (
      (playerAction === 'rock' && computerAction === 'scissors') ||
      (playerAction === 'scissors' && computerAction === 'paper') ||
      (playerAction === 'paper' && computerAction === 'rock')
    ) {
      roundResults.textContent = 'Player wins!';
      playerScore += 1;
    } else {
      roundResults.textContent = 'Computer wins!';
      computerScore += 1;
    }

    resultsContainer.appendChild(roundResults);

    // end game once someone reaches 5 points
    if (playerScore === 5 || computerScore === 5) {
      // prevent further input
      buttons.forEach(button => {
        button.setAttribute('disabled', true);
      });
      // then alert the winner
      alert(
        `${playerScore > computerScore ? 'Player' : 'Computer'} wins the game!`
      );
    }
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  buttons.forEach(button => {
    button.removeAttribute('disabled');
  });

  resultsContainer.innerHTML = '';
}

resetButton.addEventListener('click', resetGame);

buttons.forEach((button, i) => {
  button.addEventListener('click', () => {
    playRound(options[i], computerPlay());
  });
});

/*
In our UI, the player should be able to play the game
by clicking on buttons rather than typing their answer in
a prompt.
a. For now, remove the logic that plays exactly five rounds.

b. Create three buttons, one for each selection. Add an
event listener to the buttons that calls your playRound
function with the correct playerSelection every time a button
is clicked. (you can keep the console.logs for this step)

c. Add a div for displaying results and change all of your
console.logs into DOM methods.

d. Display the running score, and announce a winner of the
game once one player reaches 5 points.
*/
