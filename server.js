require('dotenv').config();
const pg = require('pg');
const express = require('express');
const app = express();
const port = 3000;
// const config = {connectionString: process.env.DATABASE_URL};

const pool = new pg.Pool({
    user: 'peace',
    host: '127.0.0.1',
    database: 'youtube',
    password: 'try',
    port: '5432'});
pool.connect();

pool.on('connect', () => {
    console.log('connected to the db');
});

pool.end();

app.listen(3000, () => {console.log(`Server started on port ${port}...`)});