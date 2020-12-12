const express = require('express')
const app = express();
const port = 8000;

require('dotenv').config()

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});