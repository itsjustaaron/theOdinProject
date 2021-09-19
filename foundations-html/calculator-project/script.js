const buttons = document.querySelectorAll('button');
const displayArea = document.querySelector('.calculator__display');

// functions for basic math
const add = (n1, n2) => +(n1 + n2).toFixed(3);
const subtract = (n1, n2) => +(n1 - n2).toFixed(3);
const multiply = (n1, n2) => +(n1 * n2).toFixed(3);

function divide(n1, n2) {
    // don't allow dividing by zero
    if (n2 === 0) {
        // display warning
        // "are you trying to kill me?!"
        // return updateDisplay();
    }

    return +(n1 / n2).toFixed(3);
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
    console.table('before:', displayValue, firstNumber, secondNumber, selectedOperation);
    // check if input is an operator
    if (Object.keys(operators).includes(e.target.textContent)) {
        console.log("It's an operator!");
        // store the current displayValue for calculation;
        // since operations can be chained,
        // check if firstNumber is already in use
        if (!firstNumber) {
            firstNumber = +displayValue;
            displayValue = '0';
        } else {
            // perform current operation and update the display
            // TODO: find bug in chaining multiple operations
            // seems to get stuck using previous operator?
            // also uses wrong / "old" nums
            displayValue = operate(firstNumber, secondNumber, selectedOperation);
            firstNumber = +displayValue;
            secondNumber = undefined;
            selectedOperation = undefined;
            displayArea.textContent = displayValue;
        }

        selectedOperation = operators[e.target.textContent];
        console.table('after:', displayValue, firstNumber, secondNumber, selectedOperation);
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
        console.table('after:', displayValue, firstNumber, secondNumber, selectedOperation);
        return firstNumber = +displayValue;
    }

    if (e.target.textContent.toLowerCase() === 'clear') {
        // clear storage values before updating display
        resetStorage(true);
        console.table('after:', displayValue, firstNumber, secondNumber, selectedOperation);
        return displayArea.textContent = displayValue;
    }

    if (!displayValue || displayValue === '0') {
        displayValue = e.target.textContent;

        if (firstNumber) {
            secondNumber = +displayValue;
        }

        console.table('after:', displayValue, firstNumber, secondNumber, selectedOperation);
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

    console.table('after:', displayValue, firstNumber, secondNumber, selectedOperation);
    return displayArea.textContent = displayValue;
}

buttons.forEach(button => button.addEventListener('click', updateDisplay));