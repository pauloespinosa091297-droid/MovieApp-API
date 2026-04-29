require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const auth = require('./auth');

const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');

const app = express();

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Connected to MongoDB Atlas'));

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

app.use(auth.errorHandler);

const PORT = process.env.PORT || 4000;
if(require.main === module) {
	// http:localhost:4000
	app.listen(process.env.PORT || 3000, () => console.log(`API is now online on port ${process.env.PORT || 3000}`)); 
};

// In creating APIS, exporting modules in the "index.js" can be ommited
module.exports = {app, mongoose};