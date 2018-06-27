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
        default: (Math.floor(Date.now()/1000) + 2629743),
        required: true
    },
    privateOrPublic: {
        type: String,
        default: 'public',
        required: true
    },
    accessCounts: {
        type: Number,
        default: 0
    }
});

const URL = mongoose.model('URL', URLSchema );

module.exports = URL;