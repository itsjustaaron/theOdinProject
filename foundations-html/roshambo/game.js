// rock paper scissors
const options = ['rock', 'paper', 'scissors'];

// need function to emualate computer player's action
function computerPlay() {
  const randomNumber = Math.floor(options.length * Math.random());
  return options[randomNumber];
}

function cleanInput(value) {
  return typeof value === 'string' ? value.toLowerCase() : null;
}

// need function to compare user's action to computer's action
// function should accept case-insensitive arguments
// return a string that declares the winner: "You win! Rock beats scissors!"
function playRound(playerAction, computerAction) {
  // compare user inputs
  if (playerAction === computerAction) {
    // unclear on draws - currently gives point to computer
    // should they instead not count towards the total?
    return 0;
  }
  // rock beats scissors, paper beats rock, scissors beats paper
  // commented out to rework output
  // let outcome = 'lose';
  // if (
  //   (playerAction === 'rock' && computerAction === 'scissors') ||
  //   (playerAction === 'scissors' && computerAction === 'paper') ||
  //   (playerAction === 'paper' && computerAction === 'rock')
  // ) {
  //   outcome = 'win';
  // }

  // return `You ${outcome}! ${
  //   outcome === 'win' ? playerAction : computerAction
  // } beats ${outcome === 'win' ? computerAction : playerAction}`;

  // version two
  let outcome = false;
  if (
    (playerAction === 'rock' && computerAction === 'scissors') ||
    (playerAction === 'scissors' && computerAction === 'paper') ||
    (playerAction === 'paper' && computerAction === 'rock')
  ) {
    outcome = true;
  }

  return outcome;
}

// need function to play 5 rounds and determine winner at the end
function game() {
  let playerScore = 0;
  let computerScore = 0;
  let drawCount = 0;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; i++) {
    const player = cleanInput(prompt('Rock? Paper? Scissors?'));
    const playerWins = playRound(player, computerPlay());
    if (playerWins) {
      playerScore += 1;
      console.log(`Player wins round ${i + 1}`);
    } else if (!playerWins && playerWins !== 0) {
      computerScore += 1;
      console.log(`Computer wins round ${i + 1}`);
    } else {
      drawCount += 1;
      console.log(`Draw! Player and computer both played ${player}.`);
    }
  }

  return `${
    playerScore > computerScore ? 'Player' : 'Computer'
  } wins! The final score is: Player - ${playerScore} | Computer - ${computerScore} | Draws - ${drawCount}`;
}

game();
