const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        maxLength: 50,
    },
    id: {
        type: String,
        required: true,
        maxLength: 30,
    },
    slug: {
        type: String,
        required: true,
        maxLength: 100,
    },
    liked: Boolean,
    createdBy: String,
});

module.exports = mongoose.model('Game', GameSchema);