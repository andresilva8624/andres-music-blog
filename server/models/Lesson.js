const { Schema, model } = require('mongoose');

const lessonSchema = new Schema(
	{
		title: String,
        description: String,
        tabsURL: String,
        videoURL: String
	},
	// set this to use virtual below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

const Lesson = model('Lesson', lessonSchema);

module.exports = Lesson;
