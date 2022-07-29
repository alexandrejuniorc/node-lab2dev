require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use('/employee', userRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@lab2dev.bawjg.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conexão ao MongoDB!');
    app.listen(3000);
  })
  .catch((error) => console.log(error));
