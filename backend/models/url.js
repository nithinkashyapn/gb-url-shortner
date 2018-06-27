const mongoose = require('mongoose');

const URLSchema = mongoose.Schema({
    shortURL: {
        type: String,
        required: true
    },
    longURL: {
        type: String,
        required: true
    },
    timeOfCreation: {
        type: Number,
        default: Math.floor(Date.now()/1000),
        required: true
    },
    timeOfDeletion: {
        type: Number,
        required: true
    },
    privateOrPublic: {
        type: String,
        required: true
    },
    accessCounts: {
        type: Number,
        default: 0
    }
});

const URL = module.exports = mongoose.model('URL', URLSchema );