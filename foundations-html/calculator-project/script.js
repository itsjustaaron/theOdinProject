const buttons = document.querySelectorAll('button');
const displayArea = document.querySelector('.calculator__display');

// functions for basic math
const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;

function divide(n1, n2) {
    // don't allow dividing by zero
    if (n2 === 0) {
        // display warning
        // "are you trying to kill me?!"
        // return updateDisplay();
    }

    return n1 / n2;
}

const operators = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide
};

const operate = (n1, n2, operation) => operation(n1, n2);

let displayValue = '0';
let firstNumber;
let secondNumber;

// update display window based on user input
function updateDisplay(e) {
    console.log(e, e.target.textContent);

    // operator logic
    if (Object.keys(operators).includes(e.target.textContent)) {
        // store the current displayValue for operation;
        // since operations can be chained, make sure firstNumber
        // is not already in use
        if (!firstNumber) {
            firstNumber = +displayValue;
            console.log(firstNumber);
        } else {
            // perform current operation and update the display

        }
    }

    // equals === 'showtime, baby!'
    if (e.target.textContent === '=') {
        // return displayArea.textContent = operate
    }

    if (e.target.textContent.toLowerCase() === 'clear') {
        displayValue = '0';
        return displayArea.textContent = displayValue;
    }

    if (!displayValue || displayValue === '0') {
        displayValue = e.target.textContent;
        console.log('display value was 0')
        return displayArea.textContent = displayValue;
    }

    // only allow one period in input
    if (e.target.textContent === '.') {
        if (!displayValue.includes('.')) {
            displayValue += e.target.textContent;
        }

        return displayArea.textContent = displayValue;
    }

    if (displayValue && !Object.keys(operators).includes(e.target.textContent)) {
        displayValue += e.target.textContent;
    }

    return displayArea.textContent = displayValue;
}

buttons.forEach(button => button.addEventListener('click', updateDisplay));