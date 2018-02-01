'use strict';

module.exports = function (testString) {
  return testString.split('\n').filter(function (row) {
    return !row.startsWith('Art');
  }).map(function (row) {
    return row.split('\t');
  }).filter(function (row) {
    return row[1];
  }).map(function (row) {
    var dateArr = row[4].split('.').map(function (date) {
      return parseInt(date);
    });
    var date = new Date(2000 + dateArr[2], dateArr[1] - 1, dateArr[0] + 1);

    return {
      type: row[0],
      name: row[1],
      class: row[2],
      date: date.getTime(),
      teacher: row[10]
    };
  });
};