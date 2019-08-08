require('dotenv').config();
const pg = require('pg');
const express = require('express');
const app = express();
const port = 3005;
// const config = {connectionString: process.env.DATABASE_URL};

const pool = new pg.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'youtube',
    password: 'apple123',
    port: '5432'});
pool.connect();

pool.on('connect', () => {
    console.log('connected to the db');
});

pool.end();

//tell express that it should accept json
app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3005, () => {console.log(`Server started on port ${port}...`)});