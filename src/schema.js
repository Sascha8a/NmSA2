module.exports = `
    type Query {
        students: [Student],
        student(name: String!): Student,
        absences: [Absence],
        exams: [Exam]
    }

    type Student {
        id: String! @isUnique,
        name: String!,
        class: String!,
        absences: [Absence],
        overallH: Int,
        overallM: Int
    }

    type Absence {
        date: String!,
        weekday: String!,
        hours: Int!,
        minutes: Int!,
        teacher: String!,
        subject: String!,
        reason: String!,
        verified: String,!
        studentId: String! 
    }

    type Exam {
        type: String!,
        name: String!,
        class: String!,
        date: String!,
        teacher: String!
    }
`
