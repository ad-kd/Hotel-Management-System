const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { type: String, enum: ['user', 'hotelOwner', 'admin'], default: 'user' },
    recentSearchedCities: [{ type: String }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
