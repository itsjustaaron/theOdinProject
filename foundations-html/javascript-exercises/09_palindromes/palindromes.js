const palindromes = function (str) {
    const characters = str.replace(/[^\w]/g, '').toLowerCase();
    const middle = Math.floor(characters.length / 2);
    let status = true;

    for (let i = 0; i < middle; i++) {
        if (characters[i] !== characters[characters.length - (i + 1)]) {
            status = false;
        }
    }

    return status;
};

// Do not edit below this line
module.exports = palindromes;
