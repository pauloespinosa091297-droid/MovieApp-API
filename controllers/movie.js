const Movie = require('../models/Movie');
const auth = require('../auth');

module.exports.addMovie = (req, res) => {
    let newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre,
        videoUrl: req.body.videoUrl
    });

    return newMovie.save()
        .then(movie => res.status(201).send(movie))
        .catch(err => auth.errorHandler(err, req, res));
};

module.exports.getAllMovies = (req, res) => {
    return Movie.find({})
        .then(movies => res.status(200).send({ movies }))
        .catch(err => auth.errorHandler(err, req, res));
};

module.exports.getMovie = (req, res) => {
    return Movie.findById(req.params.movieId)
        .then(movie => {
            if (!movie) return res.status(404).send({ message: 'Movie not found' });
            return res.status(200).send(movie);
        })
        .catch(err => auth.errorHandler(err, req, res));
};

module.exports.updateMovie = (req, res) => {
    return Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true })
        .then(movie => {
            if (!movie) return res.status(404).send({ message: 'Movie not found' });
            res.status(200).send({ message: 'Movie updated successfully', updatedMovie: movie });
        })
        .catch(err => auth.errorHandler(err, req, res));
};

module.exports.deleteMovie = (req, res) => {
    return Movie.findByIdAndDelete(req.params.movieId)
        .then(movie => {
            if (!movie) return res.status(404).send({ message: 'Movie not found' });
            res.status(200).send({ message: 'Movie deleted successfully' });
        })
        .catch(err => auth.errorHandler(err, req, res));
};

module.exports.addComment = (req, res) => {
    return Movie.findByIdAndUpdate(
        req.params.movieId,
        { $push: { comments: { userId: req.user.id, comment: req.body.comment } } },
        { new: true }
    )
    .then(movie => res.status(201).send({ message: 'Comment added successfully', updatedMovie: movie }))
    .catch(err => auth.errorHandler(err, req, res));
};

module.exports.getComments = (req, res) => {
    return Movie.findById(req.params.movieId)
        .then(movie => res.status(200).send({ comments: movie.comments }))
        .catch(err => auth.errorHandler(err, req, res));
};