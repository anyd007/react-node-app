const mongoose = require("mongoose")

const schema = mongoose.Schema({
	id: String,
	username: String,
    password: String
})


module.exports = mongoose.model("RegUsers", schema)