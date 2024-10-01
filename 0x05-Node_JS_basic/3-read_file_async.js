const fs = require('fs').promises;

/**
 * Reads a CSV file asynchronously and counts the number of students by their field of study.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<void>} - A promise that resolves when processing is complete.
 */
function countStudents(filePath) {
  return fs.readFile(filePath, 'utf-8')
    .then((data) => {
      // Trim any extra newlines or spaces from the file
      const fileContent = data.trim();

      // Split the content by new lines
      const lines = fileContent.split('\n');

      // Ensure there is at least a header and one student record
      if (lines.length <= 1) {
        throw new Error('Cannot load the database');
      }

      let totalStudents = 0;
      const studentsByField = {};

      // Process each line starting from index 1 (skip the header)
      for (let i = 1; i < lines.length; i += 1) {
        const studentData = lines[i].split(',');

        // Ensure that the line has exactly 4 fields and is not empty
        if (studentData.length === 4) {
          const [firstName, , , field] = studentData;

          // Increment total students count
          totalStudents += 1;

          // Add student to the respective field list
          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }
          studentsByField[field].push(firstName);
        }
      }

      // Log the total number of students
      console.log(`Number of students: ${totalStudents}`);

      // Log the count of students for each field
      Object.keys(studentsByField).forEach((field) => {
        const students = studentsByField[field];
        console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      });
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
