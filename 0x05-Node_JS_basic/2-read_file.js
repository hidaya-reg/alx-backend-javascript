const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    if (lines.length <= 1){
      throw new Error('Cannot load the database');
    }

    const headers = lines.shift();
    const studentsByField = {};
    let totalStudents = 0;

    lines.forEach(line => {
      const [firstname, lastname, age, field] = line.split(',');
      if (firstname && lastname && age && field) {
        totalStudents++;
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstname);
      }
    });
    console.log(`Number of students: ${totalStudents}`);
    for (const [field, students] of Object.entries(studentsByField)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (error) {
      throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
