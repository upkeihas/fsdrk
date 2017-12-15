var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

//TODO: Check validation limits
function isValidUsername (v) {
	return v.length > 2;
};
function isValidEmail (v) {
	return v.length > 2;
};
function isValidPassword (v) {
	return v.length > 3;
};

var schema = mongoose.Schema({
	//id: { type:String, /*index:true, */required:true,	/*unique:true*/},
	username: {
		type:String,
		validate: [isValidUsername, 'invalid username'],
		required:true
	},
	email: {
		type:String,
		validate: [isValidEmail, 'invalid email']
	},
  password: {
		type:String,
		validate: [isValidPassword, 'invalid password'],
		required:true
	},
	userType: {
		type:Boolean, // true=admin
		default:false
	},
	adminEnabled: {
		type:Boolean,
		default:false
	},
	profileImage: {
		type:String,
		default:"defaultuser.jpg"
	},
  images: [String],
	// follower and following must be move to separate table if over 10 000 users.
  following: [String],
  follower: [String]
});

schema.methods.generateHash = function(password) {
	console.log("generateHash");
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

schema.methods.isPasswordValid = function(password) {
	console.log("compareSync "+password+" "+this.password);
//	console.log(this);
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", schema);