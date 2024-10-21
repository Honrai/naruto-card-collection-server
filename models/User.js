const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    rarity: String,
    number: String,
    collection: Number,
    duplicates: Number,
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cards: [CardSchema],
});

module.exports = mongoose.model('User', UserSchema);
