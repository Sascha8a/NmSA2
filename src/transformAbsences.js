module.exports =
(absencesString) =>
  absencesString
    .split('\n')
    .filter(row => !row.startsWith('Schüler'))
    .map(row => row.split('\t'))
    .filter(row => row[1])
    .map(row => {
      const dateArr = row[4]
        .split('.')
        .map(date => parseInt(date))
      const date = new Date(2000 + dateArr[2], dateArr[1] - 1, dateArr[0] + 1)
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
      }
    })
