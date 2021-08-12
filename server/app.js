const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const upload = require('./upload');

// app
const app = express();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', upload);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
