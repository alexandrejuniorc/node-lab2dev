require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const User = require('./models/Person');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/employee', async (req, res) => {
  const { name, role, birthday_date, salary } = req.body;
  const user = {
    name,
    role,
    birthday_date,
    salary,
  };

  try {
    await User.create(user);

    res
      .status(201)
      .json({ message: 'Usuário inserido no sistema com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.get('/employee', async (req, res) => {});

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
