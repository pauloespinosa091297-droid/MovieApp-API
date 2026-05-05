const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');
const { verify, verifyAdmin } = require('../auth');

router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);

router.get('/getMovies', movieController.getAllMovies);

router.get('/getMovie/:movieId', movieController.getMovie);

router.patch('/updateMovie/:movieId', verify, verifyAdmin, movieController.updateMovie);

router.delete('/deleteMovie/:movieId', verify, verifyAdmin, movieController.deleteMovie);

router.patch('/addComment/:movieId', verify, movieController.addComment);

router.get('/getComments/:movieId', movieController.getComment);

module.exports = router;