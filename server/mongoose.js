const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jgtwm.mongodb.net/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    });

const pollSchema = {
    title: String,
    explanation: String,
    creator: String,
    date: Date,
    questions: [
        {
            question: String,
            answer1: String,
            votes1: Number,
            answer2: String,
            votes2: Number,
            answer3: String,
            votes3: Number,
            answer4: String,
            votes4: Number,
            // openAnswers: [String]
        }
    ]
}

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;