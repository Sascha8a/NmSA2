'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _apolloServerExpress = require('apollo-server-express');

var _graphqlTools = require('graphql-tools');

var _lodash = require('lodash');

var _transformAbsences = require('./transformAbsences');

var _transformAbsences2 = _interopRequireDefault(_transformAbsences);

var _transformStudents = require('./transformStudents');

var _transformStudents2 = _interopRequireDefault(_transformStudents);

var _transformTests = require('./transformTests');

var _transformTests2 = _interopRequireDefault(_transformTests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var _students = [];
var _absences = [];
var _exams = [];

var typeDefs = require('./schema.js');
var resolvers = {
  Query: {
    students: function students() {
      return _students;
    },
    student: function student(_, _ref) {
      var name = _ref.name;
      return (0, _lodash.find)(_students, { name: name });
    },
    absences: function absences() {
      return _absences;
    },
    exams: function exams() {
      return _exams;
    }
  },
  Student: {
    absences: function absences(student) {
      return (0, _lodash.filter)(_absences, { studentId: student.id });
    },
    overallH: function overallH(student) {
      return (0, _lodash.filter)(_absences, { studentId: student.id }).reduce(function (acc, cur) {
        return acc + parseInt(cur.hours);
      }, 0);
    },
    overallM: function overallM(student) {
      return (0, _lodash.filter)(_absences, { studentId: student.id }).reduce(function (acc, cur) {
        return acc + parseInt(cur.minutes);
      }, 0);
    }
  }
};

var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: typeDefs,
  resolvers: resolvers
});

var corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use('/graphql', _bodyParser2.default.json(), (0, _cors2.default)(corsOptions), (0, _apolloServerExpress.graphqlExpress)({ schema: schema }));
app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

app.listen(3000, function () {
  console.log('Listening on http://localhost:3000/graphiql');
});

_fs2.default.readFile('absences.txt', 'utf8', function (err, str) {
  if (err) throw err;
  _students = (0, _transformStudents2.default)(str);
  _absences = (0, _transformAbsences2.default)(str);
});

_fs2.default.readFile('exams.txt', 'utf8', function (err, str) {
  if (err) throw err;
  _exams = (0, _transformTests2.default)(str);
});