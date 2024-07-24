const express = require('express');
const port = 3001;
const cors = require('cors')
const app = express();

const routes = require('./routes/index');

app.use(express.json());

app.use(cors(
  { origin: '*' }
))

app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})