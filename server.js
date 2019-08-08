// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);

//tell express that it should accept json
app.use(bodyParser.json())

const subscribersRouter = require('./routes/routes')
app.use('/subscribers', subscribersRouter)

app.listen(3005, () => {console.log(`Server started on port ${port}...`)});