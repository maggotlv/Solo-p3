const router = require('express').Router();
const Register = require('../views/Register');
const Login = require('../views/Login');
const Profile = require('../views/Profile');

const { Users, Movies } = require('../db/models');

router.get('/register', (req, res) => {
  res.render(Register, {});
});

router.get('/profile', async (req, res) => {
  const addedMovies = await Movies.findAll({ where: { userId: req.session.user.id } });
  const moviesData = addedMovies.map((m) => m.get({ plain: true }));
  // console.log(moviesData)
  const moviesArr = [];
  await Promise.all(
    moviesData.map(async (m) => {
      const response = await fetch(`https://search.imdbot.workers.dev/?tt=${m.movieID}`);
      const data = await response.json();
      const { name, image, description } = data.short;
      moviesArr.push({ name, image, description, movieID: m.movieID });
    })
  );
  console.log(moviesArr);
  res.render(Profile, { moviesArr });
});

router.post('/register', async (req, res) => {
  try {
    const { name, password } = req.body.data;
    const create = await Users.create({ name, password });
    const user = create.get({ plain: true });
    req.session.user = user;
    res.json(create);
  } catch (error) {
    console.log(error);
  }
});

router.get('/login', (req, res) => {
  res.render(Login, {});
});

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body.data;
    const loginData = await Users.findOne({ where: { name } });
    const user = loginData?.get({ plain: true });
    if (!user) {
      res.json('User does not exist');
    } else if (user.name === name && user.password === password) {
      req.session.user = user;
      res.json('logged in');
      // res.redirect('/');
    } else {
      res.json('Wrong name or password');
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(error);
    else {
      res.clearCookie('JaysCookie');
      res.redirect('/');
    }
  });
});

module.exports = router;

