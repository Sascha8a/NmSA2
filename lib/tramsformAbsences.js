'use strict';

module.exports = function (absencesString) {
  return absencesString.split('\n').filter(function (row) {
    return !row.startsWith('Schüler');
  }).map(function (row) {
    return row.split('\t');
  }).map(function (row) {
    return {
      date: row[4],
      weekday: row[5],
      hours: row[6],
      minutes: row[7],
      teacher: row[8],
      subject: row[9],
      reason: row[10],
      valid: row[11],
      studentId: row[1]
    };
  });
};