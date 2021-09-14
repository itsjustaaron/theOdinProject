const ftoc = function(temp) {
  return +((temp - 32) * 5 / 9).toFixed(1);
};

const ctof = function(temp) {
  return +(temp * 9 / 5 + 32).toFixed(1);
};

// Do not edit below this line
module.exports = {
  ftoc,
  ctof
};
