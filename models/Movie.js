const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },

    director: { type: String, required: true },
    year: { type: Number, required: true },

    description: { type: String, required: true },
    
    genre: { type: String, required: true },
    comments: [
        {
            userId: { type: String, required: true },
            comment: { type: String, required: true }
        }
    ],
    videorUrl: {
              type: String,
              default: ""
            }
});

module.exports = mongoose.model('Movie', movieSchema);