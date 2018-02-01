module.exports =
(testString) =>
  testString
    .split('\n')
    .filter(row => !row.startsWith('Art'))
    .map(row => row.split('\t'))
    .filter(row => row[1])
    .map(row => {
      const dateArr = row[4]
        .split('.')
        .map(date => parseInt(date))
      const date = new Date(2000 + dateArr[2], dateArr[1] - 1, dateArr[0] + 1)

      return {
        type: row[0],
        name: row[1],
        class: row[2],
        date: date.getTime(),
        teacher: row[10]
      }
    })
