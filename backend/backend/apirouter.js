let mongoose = require("mongoose");
let user = require("./models/user");
let image = require("./models/image");
let express = require("express");
let apiRouter = express.Router();

mongoose.connect("mongodb://localhost/KopioGramDB", {useMongoClient:true});

//Get all users
apiRouter.get("/users", function(req,res) {
	console.log("GET /api/users");
	user.find(function(err,users) {
		if(err) {
			console.log("Failed to load users");
			res.status(404).json({"Message":"No users found"});
		} else {
			console.log("Result in finding users");
			res.status(200).json(users);
		}	
	});
});


//Get all images
apiRouter.get("/images", function(req,res) {
	console.log("GET /api/images");
	image.find(function(err,imageFlow) {
		if(err) {
			console.log("Failed to load imageFlow");
			res.status(404).json({"Message":"No images found"});
		} else {
			console.log("Result in finding imageFlow");
			res.status(200).json(imageFlow);
		}	
	});
});

// Get image by id
apiRouter.get("/image/:id", function(req,res) {
	console.log("GET /api/image/:id");
	console.log("req.params.id="+req.params.id);
	let id = req.params.id;
	image.find({"_id":id}, function(err, image) {
		if(err) {
			console.log("Failed to find image");
			res.status(404).json({"message":"Failed to find image"});
		} else {
			if(JSON.stringify(image) == "[]") {
				console.log("Image not found");
			} else {
				console.log("Success in finding image");	
			}
			res.status(200).json(image);
		}
	});
});

// Get image by imageId
apiRouter.get("/imageid/:id", function(req,res) {
	console.log("GET /api/imageid/:id");
	console.log("req.params.id="+req.params.id);
	let id = req.params.id;
	image.find({"imageId":id}, function(err, image) {
		if(err) {
			console.log("Failed to find image");
			res.status(404).json({"message":"Failed to find image"});
		} else {
			if(JSON.stringify(image) == "[]") {
				console.log("Image not found");
			} else {
				console.log("Success in finding image");	
			}
			res.status(200).json(image);
		}
	});
});

// Get image by imageUrl
apiRouter.get("/imageurl/:imageUrl", function(req,res) {
	console.log("GET /api/imageurl/:imageUrl");
	console.log("req.param.imageUrl="+req.param.imageUrl);
	let imageUrl = req.params.imageUrl;
	image.find({"imageUrl":imageUrl}, function(err, image) {
		if(err) {
			console.log("Failed to find image");
			res.status(404).json({"message":"Failed to find image"});
		} else {
			if(JSON.stringify(image) == "[]") {
				console.log("Image not found");
			} else {
				console.log("Success in finding image");	
			}
			res.status(200).json(image);
		}
	});
});

// Find images by seaching substring from description, tags or comment field
apiRouter.get("/image/search/:text", function(req,res) {
	console.log("GET /api/image/search/"+req.params.text);
	console.log("req.params.text:");
	console.log(req.params.text);
	var search = req.params.text;
	image.find( {"$or": [/*{ "owner": { "$regex": req.params.text, "$options": "i" }},*/
		{ "description": { "$regex": req.params.text, "$options": "i" }},
		{"tags": { "$regex": req.params.text, "$options": "i" }},
		{"comments.comment": { "$regex": req.params.text, "$options": "i" } }]}, function(err, image) {
		if(err) {
			console.log("Failed to find image");
			res.status(404).json({"message":"Failed to find image"});
		} else {
			if(JSON.stringify(image) == "[]") {
				console.log("Image not found");
			} else {
				console.log("Success in finding image");	
			}
			res.status(200).json(image);
		}
	});
});

// Find images for userName
apiRouter.get("/image/username/:text", function(req,res) {
	console.log("GET /api/image/username/"+req.params.text);
	console.log("req.params.text:");
	console.log(req.params.text);
	var search = req.params.text;
	user.findOne( {"username": req.params.text}, function(err, user1) {
		if(err) {
			console.log("Failed to find image");
			res.status(404).json({"message":"Failed to find image"});
		} else {
			if(JSON.stringify(user1) == "[]") {
				console.log("UserId not found");
			} else {
				console.log("Success in finding userId");	
				console.log(user1);
				//Find images for userId
				image.find({ "owner": user1._id}, function(err, image) {
					if(err) {
						console.log("Failed to find images");
						res.status(404).json({"message":"Failed to find images"});
					} else {
						if(JSON.stringify(image) == "[]") {
							console.log("Images not found");
						} else {
							console.log("Success in finding images");	
						}
						res.status(200).json(image);
					}
				});
			}
			res.status(200).json(image);
		}
	});
});

// Find images by userId
apiRouter.get("/image/userid/:id", function(req,res) {
	console.log("GET /api/image/userid/"+req.params.text);
	console.log("req.params.id:");
	console.log(req.params.id);
	var search = req.params.id;
	image.find({ "owner": req.params.id }, function(err, image) {
		if(err) {
			console.log("Failed to find image");
			res.status(404).json({"message":"Failed to find image"});
		} else {
			if(JSON.stringify(image) == "[]") {
				console.log("Image not found");
			} else {
				console.log("Success in finding image");	
			}
			res.status(200).json(image);
		}
	});
});

// Add or update image 
apiRouter.post("/image", function(req,res) {
	console.log("POST /api/image");
	console.log("req.body:");
	console.log(req.body);
	var temp = new image(req.body);
	console.log("temp:");
	console.log(temp);
	
	temp.save(function(err,item) {
		if(err) {
			console.log("Failed to save image. ("+err.message+")");
			res.status(409).json({"Message":"Failed to save image"});
		} else {
			console.log("Success in saving image");
			res.status(200).json({"message":"success"});
		}
	});
});

// Delete image
apiRouter.delete("/image/:id", function(req,res) {
	console.log("Delete image");
	let id = req.params.id;
	image.remove({"_id":id}, function(err) {
		if(err) {
			console.log("Failed to remove image");
			res.status(404).json({"message":"Failed to remove image"});
		} else {
			console.log("Success in removing image");
			res.status(200).json({"message":"success"});
		}
	});
});

module.exports = apiRouter;