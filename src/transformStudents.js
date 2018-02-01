import { intersectionWith, isEqual } from 'lodash'

module.exports =
(studentsString) => {
  let ungrouped = studentsString
  .split('\n')
  .filter(row => !row.startsWith('Schüler'))
  .map(row => row.split('\t'))
  .filter(row => row[1])
  .map(row => {
    return {
      name: row[0],
      class: row[3],
      id: parseInt(row[1])
    }
  })

  return intersectionWith(ungrouped, ungrouped, isEqual)
}
