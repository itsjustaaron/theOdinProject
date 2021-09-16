const add = function(num1, num2) {
	return num1 + num2;
};

const subtract = function(num1, num2) {
	return num1 - num2;
};

const sum = function(arr) {
	return arr.reduce((a, b) => a + b, 0);
};

const multiply = function(arr) {
  return arr.reduce((a, b) => a * b);
};

const power = function(num1, num2) {
	return num1 ** num2;
};

const factorial = function(n) {
  if (!n) return 1;

	let results = n;

  while (n > 1) {
    results *= --n;
  }

  return results;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
