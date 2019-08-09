import express from 'express';
import bodyParser from 'body-parser';
import subscribersRouter from '../src/routes/routes';

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

app.use('/api/v1/subscribers', subscribersRouter)

app.listen(port, () => {console.log(`Server started on port ${port}...`)});
