const express = require ('express');
const movieController = require ('../controllers/movie');
const { verify, verifyAdmin } =  require ('../auth');

const router  =  express.Router();

router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.get("/getMovies", movieController.getMovies);
router.get("/getMovie/:id", movieController.getMovie);
router.patch("/updateMovie/:id", verify, verifyAdmin, movieController.updateMovie);
router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);
router.patch("/addComment/:id", verify, movieController.addComment);
router.get("/getComment/:id", verify, movieController.getComment);




module.exports = router;
