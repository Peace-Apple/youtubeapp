// import the package
import express from 'express';
import bodyParser from 'body-parser';
// import expressValidator from 'express-validator';
import cors from 'cors';
import subscribersRouter from '../src/routes/routes';

const port = process.env.PORT || 3005;

//execute it
const app = express(); 

// to serve static files in express
app.use(express.static('public'))

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);

app.use(cors())
//tell express that it should accept json
app.use(bodyParser.json())

// app.use(expressValidator)

app.use('/api/v1/subscribers', subscribersRouter)

app.listen(port, () => {console.log(`Server started on port ${port}...`)});
