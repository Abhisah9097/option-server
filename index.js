require('dotenv').config();

const express = require('express');
const routes = require('./routes/api');
const cors = require('cors');
// Enable CORS for all routes


// const mongoose = require('mongoose');
// const mongoString = process.env.DATABASE_URL;

// mongoose.connect(mongoString);
// const database = mongoose.connection;

// database.on('error', (error) => {
//     console.log(error)
// })

// database.once('connected', () => {
//     console.log('Database Connected');
// })
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

// app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})