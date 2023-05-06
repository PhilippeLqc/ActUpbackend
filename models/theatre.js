const mongoose = require('mongoose');

const theatreSchema = mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    genre: String,
});

const Theatre = mongoose.model('theatrepieces', theatreSchema);

module.exports = Theatre;