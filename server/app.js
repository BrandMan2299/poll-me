const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use('/api', require('./api'))


module.exports = app;