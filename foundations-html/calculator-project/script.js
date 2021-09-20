const buttons = document.querySelectorAll('button');
const displayArea = document.querySelector('.calculator__display');

// functions for basic math
const add = (n1, n2) => +(n1 + n2).toFixed(3);
const subtract = (n1, n2) => +(n1 - n2).toFixed(3);
const multiply = (n1, n2) => +(n1 * n2).toFixed(3);

function divide(n1, n2) {
    // don't allow dividing by zero
    if (n2 === 0) {
        // doesn't work?
        console.log("DON'T DIVIDE BY ZERO AHHHHH");
        resetStorage();
        return displayArea.textContent = "Are you trying to kill me?!";
    }

    return +(n1 / n2).toFixed(3);
}

const operators = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide
};

const operate = (n1, n2, operation) => operation(+n1, +n2);

let displayValue = '0';
let firstNumber;
let secondNumber;
let selectedOperation;
// let chaining = false;

function resetStorage(displayReset = false) {
    displayReset ? displayValue = '0' : null;
    firstNumber = undefined;
    secondNumber = undefined;
    selectedOperation = undefined;
}

// update display window based on user input
function updateDisplay(e) {
    // check if input is an operator
    if (Object.keys(operators).includes(e.target.textContent)) {
        // store the current displayValue for calculation;
        // since operations can be chained,
        // check if firstNumber is already in use
        if (!firstNumber) {
            firstNumber = +displayValue;
            displayValue = '0';
        } else {
            // perform current operation and update the display
            displayValue = operate(firstNumber, secondNumber, selectedOperation);
            firstNumber = +displayValue;
            secondNumber = undefined;
            selectedOperation = undefined;
            displayArea.textContent = displayValue;
        }

        selectedOperation = operators[e.target.textContent];
        return;
    }

    // equals === 'showtime, baby!'
    if (e.target.textContent === '=') {
        if (!firstNumber || !secondNumber || !selectedOperation) {
            return;
        }

        displayValue = operate(firstNumber, secondNumber, selectedOperation);

        // update display before clearing storage values
        displayArea.textContent = displayValue;
        resetStorage();
        return firstNumber = +displayValue;
    }

    // undo last input
    if (e.target.classList.value === 'undo') {
        displayValue.length > 1
            ? displayValue = displayValue.slice(0, displayValue.length - 1)
            : selectedOperation = undefined;
        return displayArea.textContent = displayValue;
    }

    if (e.target.textContent.toLowerCase() === 'clear') {
        // clear storage values before updating display
        resetStorage(true);
        return displayArea.textContent = displayValue;
    }

    if (!displayValue || displayValue === '0') {
        displayValue = e.target.textContent;

        if (firstNumber) {
            secondNumber = +displayValue;
        }

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
        displayValue = selectedOperation ? e.target.textContent : displayValue + e.target.textContent;
    }

    if (firstNumber) {
        secondNumber = +displayValue;
    }

    return displayArea.textContent = displayValue;
}

buttons.forEach(button => button.addEventListener('click', updateDisplay));