const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: String,
    playerName: String,
    playerClub: String,
    position: String,
    highScore: Number
})

module.exports = mongoose.model("UsersData", schema)
