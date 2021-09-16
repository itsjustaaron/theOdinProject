const findTheOldest = function(arr) {
return arr.reduce((prev, current) => {
    const today = new Date();
    if (!current.yearOfDeath) {
        current.yearOfDeath = today.getFullYear();
    }

    if (prev === 0 || prev.yearOfDeath - prev.yearOfBirth < current.yearOfDeath - current.yearOfBirth) {
        return current;
    }

    return prev;
}, 0);
};

// Do not edit below this line
module.exports = findTheOldest;
