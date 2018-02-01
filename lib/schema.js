"use strict";

module.exports = "\n    type Query {\n        students: [Student],\n        student(name: String!): Student,\n        absences: [Absence],\n        exams: [Exam]\n    }\n\n    type Student {\n        id: String! @isUnique,\n        name: String!,\n        class: String!,\n        absences: [Absence],\n        overallH: Int,\n        overallM: Int\n    }\n\n    type Absence {\n        date: String!,\n        weekday: String!,\n        hours: Int!,\n        minutes: Int!,\n        teacher: String!,\n        subject: String!,\n        reason: String!,\n        verified: String,!\n        studentId: String! \n    }\n\n    type Exam {\n        type: String!,\n        name: String!,\n        class: String!,\n        date: String!,\n        teacher: String!\n    }\n";