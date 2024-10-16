const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB)
    .then((conn) => {
        console.log('connection SuccessFull!');
    })
    .catch((err) => {
        console.log('Connection Failed');
        console.log(err);
    });

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running using ${port}.... `);
});

console.log(process.env.NODE_DEV);
