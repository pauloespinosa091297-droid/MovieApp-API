const mongoose = require ('mongoose');

const movieSchema = new mongoose.Schema ({
	title: {
		type: String,
		required: [true, 'Title is required']
		
	},
	director: {
		type: String,
		required: [true, 'Director name is required']

	},
	year: {
		type: Number,
		required: [true, 'Year is required']
	},
	description: {
		type: String,
		required: [true, 'Description is required']
	},
	genre: {
		type: String,
		required: [true, 'Genre is required']

	},
	comments: [
		{

			userId: {
				type: String,
			},
			comment: {
				type: String,
			},
		}
	],
	trailerUrl: {
		type: String,
		default:  ""
	}
})

module.exports = mongoose.model('Movie', movieSchema);