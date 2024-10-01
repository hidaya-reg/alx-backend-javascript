import { readDatabase } from '../utils.js';

export default class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const { path } = req.query;
      const students = await readDatabase(path);
      let responseText = 'This is the list of our students\n';
      for (const field of Object.keys(students).sort()) {
        responseText += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
      }
      res.status(200).send(responseText.trim());
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const { path } = req.query;
      const students = await readDatabase(path);
      res.status(200).send(`List: ${students[major].join(', ')}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
