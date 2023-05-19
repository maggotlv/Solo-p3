const router = require('express').Router();
const MoviesView = require('../views/Movies');

const { Movies } = require('../db/models');

router.get('/', (req, res) => {
  res.render(MoviesView, {});
});

router.post('/add', async (req, res) => {
  try {
    const { id } = await req.body.id;
    const create = await Movies.create({
      userId: req.session?.user.id, movieID: id, watched: false, myRating: 0,
    });
    res.json(req.session?.user.id);
  } catch (error) {
    console.log(error);
  }
});

router.get('/add', async (req, res) => {})

router.delete('/remove', async (req, res) => {
  try {
    const { movieID } = req.body.movieID; 
    const remove = await Movies.destroy({ where: { movieID, userId: req.session.user.id} });
    res.status(200).json({
      message: 'Movie successfully removed',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error removing movie',
      error,
    });
  }
});

module.exports = router;
