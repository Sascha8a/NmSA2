'use strict';

var _lodash = require('lodash');

module.exports = function (studentsString) {
  var ungrouped = studentsString.split('\n').filter(function (row) {
    return !row.startsWith('Schüler');
  }).map(function (row) {
    return row.split('\t');
  }).filter(function (row) {
    return row[1];
  }).map(function (row) {
    return {
      name: row[0],
      class: row[3],
      id: parseInt(row[1])
    };
  });

  return (0, _lodash.intersectionWith)(ungrouped, ungrouped, _lodash.isEqual);
};