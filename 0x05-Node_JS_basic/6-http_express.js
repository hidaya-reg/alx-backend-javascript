const express = require('express');

const app = express();
const PORT = 1245;

app.get('/', (_, res) => {
  res.status(200).send('Hello Holberton School!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
