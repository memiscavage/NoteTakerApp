// From Module 11 solved student mini project
// Generates random string for the id on new notes
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

