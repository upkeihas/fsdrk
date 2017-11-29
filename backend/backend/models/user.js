var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var schema = mongoose.Schema({
	id: { type:String, index:true, required:true,	unique:true},
	username: { type:String, index:true, required:true,	unique:true},
	email: { type:String, required:true },
  password: { type:String, required:true },
	userType: {	type:Boolean, default:false }, // true=admin
	adminEnabled: {	type:Boolean, default:false }, 
	profileImage: String,
  images: [String],
	// follower and following must be move to separate table if over 10 000 users.
  following: [String],
  follower: [String]
});

schema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

schema.methods.isPasswordValid = function(password) {
	console.log("compareSync "+password+" "+this.password);
	console.log(this);
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", schema);