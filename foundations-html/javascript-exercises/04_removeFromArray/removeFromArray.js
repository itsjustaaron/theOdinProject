const removeFromArray = function(arr, ...removals) {
    if (removals.length) {
        for (const item of removals) {
            if (arr.includes(item)) {
                arr.splice(arr.indexOf(item), 1);
            }
        }
    }

    return arr;
};

// Do not edit below this line
module.exports = removeFromArray;
