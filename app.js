
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();
const users = require('./routes/api/users');
const playlist = require('./routes/api/savePlaylist');


app.use(cors({ origin: true, credentials: false }));
app.use(express.json({ extended: false }));
app.use('/api/users', users);
app.use('/api/savePlaylist', playlist);


const port = process.env.PORT || 8082;
const conn_str = 'mongodb+srv://rheakartha:Rafale123@cluster0.wauzxv9.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', false);

mongoose.connect(conn_str, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        app.listen(port)
        console.log(`MongoDB Connection Suceeded...`)
    })
    .catch(err => {
        console.log(`Error in DB Connection ${err}`);
    });


