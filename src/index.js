import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { find, filter } from 'lodash'

import transformAbsences from './transformAbsences'
import transformStudents from './transformStudents'
import transformTests from './transformTests'
const app = express()

let students = []
let absences = []
let exams = []

const typeDefs = require('./schema.js')
const resolvers = {
  Query: {
    students: () => students,
    student: (_, { name }) => find(students, {name: name}),
    absences: () => absences,
    exams: () => exams
  },
  Student: {
    absences (student) {
      return filter(absences, {studentId: student.id})
    },
    overallH (student) {
      return filter(absences, {studentId: student.id})
        .reduce((acc, cur) => acc + parseInt(cur.hours), 0)
    },
    overallM (student) {
      return filter(absences, {studentId: student.id})
        .reduce((acc, cur) => acc + parseInt(cur.minutes), 0)
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use('/graphql', bodyParser.json(), cors(corsOptions), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000/graphiql')
})

fs.readFile('absences.txt', 'utf8', (err, str) => {
  if (err) throw err
  students = transformStudents(str)
  absences = transformAbsences(str)
})

fs.readFile('exams.txt', 'utf8', (err, str) => {
  if (err) throw err
  exams = transformTests(str) 
})