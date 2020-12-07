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
    creator: String,
    date: Date,
    questions: [
        {
            content: String,
            answers: [
                {
                    content: String,
                    howMany: Number
                }
            ]
        }
    ]
}

const userSchema = {
    email: String
}

const adminSchema = {
    userName: String,
    email: String,
    password: String
}

const Poll = mongoose.model('Poll', pollSchema);
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);

