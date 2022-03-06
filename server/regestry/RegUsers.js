const mongoose = require("mongoose")

const schema = mongoose.Schema({  //mongoDB ma swoje reguły wporadzania danych w tym pliku określamy je, dla każdego key:value, które pobierzemy z react.app
	id: String,
	username: String,
    password: String
})


module.exports = mongoose.model("RegUsers", schema)