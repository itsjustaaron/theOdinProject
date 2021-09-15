const grid = document.querySelector('.grid__body');
const button = document.querySelector('.grid__button');
const clearButton = document.querySelector('.grid__button.clear');

function colorSquare() {
  this.classList.add('grid__square--filled');
}

function buildGrid(n) {
  // clear grid
  grid.innerHTML = '';

  let size;

  if (typeof n === 'number') {
    size = n;
  } else {
    size = prompt('Enter the number of rows and columns (max 100)');
  }

  if (size > 100) size = 100;

  grid.style['grid-template-columns'] = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size ** 2; i++) {
    const square = document.createElement('div');
    square.classList.add('grid__square');
    grid.appendChild(square);
  }

  const squares = grid.querySelectorAll('.grid__square');

  squares.forEach(square => square.addEventListener('mouseover', colorSquare));
}

function clearGrid() {
  const squares = grid.querySelectorAll('.grid__square');
  squares.forEach(square => square.classList.remove('grid__square--filled'));
}

buildGrid(16);

button.addEventListener('click', buildGrid);
clearButton.addEventListener('click', clearGrid);
