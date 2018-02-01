'use strict';

module.exports = function (absencesString) {
  return absencesString.split('\n').filter(function (row) {
    return !row.startsWith('Schüler');
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
      date: date.getTime(),
      weekday: row[5],
      hours: parseInt(row[6]),
      minutes: parseInt(row[7]),
      teacher: row[8],
      subject: row[9],
      reason: row[10],
      verified: row[17],
      studentId: parseInt(row[1])
    };
  });
};