var mongoose = require("mongoose");

var schema = mongoose.Schema;

module.exports = mongoose.model("Contact", new schema ({
	firstName:String,
	lastName:String,
	email:String,
	phoneNumber:String
}));