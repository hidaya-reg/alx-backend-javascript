// Import the file system module
const fs = require('fs');

/**
 * Reads a CSV file and counts the number of students by their field of study.
 * @param {string} filePath - The path to the CSV file.
 */
function countStudents(filePath) {
  try {
    // Read the content of the file synchronously and remove any trailing whitespace
    const fileContent = fs.readFileSync(filePath, 'utf-8').trim();

    // Split the content by new lines
    const lines = fileContent.split('\n');

    // Ensure that there is more than just the header in the file
    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

    // Initialize variables to store the total count and students by field
    let totalStudents = 0;
    const studentsByField = {};

    // Process each line starting from index 1 (skip the header)
    for (let i = 1; i < lines.length; i += 1) {
      const studentData = lines[i].split(',');

      // Ensure each line contains the correct number of fields
      if (studentData.length === 4) {
        const [firstName, , , field] = studentData;

        // Increment the total count of students
        totalStudents += 1;

        // Group students by their field of study
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstName);
      }
    }

    // Log the total number of students
    console.log(`Number of students: ${totalStudents}`);

    // Log the count of students for each field and their first names
    Object.keys(studentsByField).forEach((field) => {
      const students = studentsByField[field];
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    });
  } catch (error) {
    // Handle errors by throwing the appropriate message
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
