const fibonacci = function(n) {
    if (n < 0) return 'OOPS';

    const fibSequence = [1, 1, 2];

    while (fibSequence.length < +n) {
        fibSequence.push(fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2]);
    }

    return fibSequence[+n - 1];
};

// Do not edit below this line
module.exports = fibonacci;
