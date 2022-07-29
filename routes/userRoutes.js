const router = require('express').Router();
const User = require('../models/User');

router.use((req, res, next) => {
  console.log(`Request type: ${req.method}`);
  console.log(`Content Type: ${req.headers['content-type']}`);
  console.log(`Date: ${new Date()}`);
  next();
});

router.post('/', async (req, res) => {
  const { name, role, birthday_date, salary } = req.body;

  if (!name) {
    res.status(242).json({ error: 'O nome é obrigatório!' });
  }

  const user = {
    name,
    role,
    birthday_date,
    created_at: new Date(),
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

router.get('/', async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });

  if (!user) {
    res.status(422).json({ message: 'Usuário não foi encontrado!' });
    return;
  }

  try {
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
