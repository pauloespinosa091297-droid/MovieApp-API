const Movie = require("../models/Movie");
const auth = require("../auth.js");
const { errorHandler } = auth;


module.exports.addMovie = (req, res) => {

  const movieData = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    description: req.body.description,
    genre: req.body.genre,
    trailerUrl: req.body.trailerUrl 
  };

  const newMovie = new Movie(movieData);

  return newMovie.save()
    .then(movie => {
      console.log("Movie saved successfully:", movie); 
      return res.status(201).send({
        message: "Movie added successfully",
        movie
      });
    })
    .catch((error) => errorHandler(error, req, res));
};

module.exports.getMovies = (req, res) => {
  return Movie.find({})
    .then((movies) => res.status(200).send({ movies }))
    .catch((error) => errorHandler(error, req, res));
};


module.exports.getMovie = (req, res) => {
  return Movie.findById(req.params.id)
    .then((movie) => {
      if (movie) return res.status(200).send(movie);
      return res.status(404).send({ message: "Movie not found" });
    })
    .catch((error) =>
      error.name === "CastError"
        ? res.status(404).send({ message: "Movie not found" })
        : errorHandler(error, req, res)
    );
};


module.exports.updateMovie = (req, res) => {
  const updatedMovie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    description: req.body.description,
    genre: req.body.genre,
    trailerUrl: req.body.trailerUrl,
  };

  return Movie.findByIdAndUpdate(req.params.id, updatedMovie, { new: true })
    .then((movie) => {
      if (movie) {
        return res.status(200).send({ message: "Movie updated successfully", movie });
      }
      return res.status(404).send({ message: "Movie not found" });
    })
    .catch((error) =>
      error.name === "CastError"
        ? res.status(404).send({ message: "Movie not found" })
        : errorHandler(error, req, res)
    );
};


module.exports.deleteMovie = (req, res) => {
  return Movie.findByIdAndDelete(req.params.id)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send({ message: "Movie not found" });
      }
      return res.status(200).send({ message: "Movie deleted successfully" });
    })
    .catch((error) =>
      error.name === "CastError"
        ? res.status(404).send({ message: "Movie not found" })
        : errorHandler(error, req, res)
    );
};



module.exports.addComment = (req, res) => {
  const { comment } = req.body;

  return Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) return res.status(404).send({ message: "Movie not found" });

      movie.comments = movie.comments || [];
      movie.comments.push({ comment, createdAt: new Date() });

      return movie.save();
    })
    .then((updatedMovie) =>
      res.status(201).send({
        message: "Comment added successfully",
       movie: updatedMovie
      })
    )
    .catch((error) =>
      error.name === "CastError"
        ? res.status(404).send({ message: "Movie not found" })
        : errorHandler(error, req, res)
    );
};


module.exports.getComment = (req, res) => {
  return Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) return res.status(404).send({ message: "Movie not found" });

      return res.status(200).send({
        comments: movie.comments || [],
      });
    })
    .catch((error) =>
      error.name === "CastError"
        ? res.status(404).send({ message: "Movie not found" })
        : errorHandler(error, req, res)
    )
};