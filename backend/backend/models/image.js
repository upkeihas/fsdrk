var mongoose = require("mongoose");

var schema = mongoose.Schema({
	imageId:String,
	imageUrl: String,
	description: String,
	timestamp: String,
	owner: String,
	likes: [String], //user ids
	tags: [String],
	comments: [{ 
//		userId:String,
//		timestamp: String,
//		comment: String
	}]

});

module.exports = mongoose.model("Image", schema);

/*
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
	 comment: String,
	 userId: String,
	 timestamp: String
});

var Commentb = mongoose.model('Commentb',commentSchema);

Commentb['Commentb'] = Commentb;

var imageSchema = new Schema({
	owner: String,
	imageUrl: String,
    comments: [Commentb["Commentb"].schema]
});

var Image = mongoose.model('Image',imageSchema);

Image['Image'] = Image;

module.exports = Image;
*/