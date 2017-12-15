var mongoose = require("mongoose");

function isValidId (v) {
	let status = v.length > 0;
    return status;
};
function isValidUrl (v) {
	let status = v.length > 2;
    return status;
};
function isValidString (v) {
	let status = v.length < 200;
	return status;
};
function isValidTimestamp (v) {
	let status = v.length > 1;
    return status;
};
function isValidUser (v) {
	let status = v.length > 0;
    return status;
};
function isValidTag (v) {
	let status = v.length < 100;
    return status;
};


var schema = mongoose.Schema({
	imageId: {
		type: String,
		validate: [isValidId, 'Invalid image id.'],
		index: true
	},
	imageUrl: {
		type: String,
		validate: [isValidUrl, 'Invalid image Url.'],
		required: true
	},
	description: {
		type: String,
		validate: [isValidString, 'Invalid image description.']
	},
	timestamp: {
		type: String,
		validate: [isValidTimestamp, 'Invalid image timestamp.']
	},
	userId: {
		type: String,
		validate: [isValidUser, 'Invalid image userId'],
		required: true },
	likes: [
		{
			type: String,
			validate: [isValidUser, 'Invalid user in image likes.'] //user ids
		}
	],
	tags: [
		{
			type: String,
			validate: [isValidTag, 'Invalid image tags.'],
			default:""
		}
	],
	viewState: {
		type: Boolean,
		default:true
	},
	comments: [
		{
			userId: {
				type: String,
				validate: [isValidUser, 'Invalid user in image comment.']
			},
			timestamp: {
				type: String,
				validate: [isValidTimestamp, 'Invalid timestamp in image comment.']
			},
			comment: {
				type: String,
				validate: [isValidString, 'Invalid image comment.']
			}
		}
	]

});

module.exports = mongoose.model("Image", schema);