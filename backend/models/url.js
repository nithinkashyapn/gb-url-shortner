const mongoose = require('mongoose');

const URLSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low']
    }
});

const URL = mongoose.model('URL', URLSchema );

module.exports = URL;