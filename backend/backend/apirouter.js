let mongoose = require("mongoose");
let userDb = require("./models/user");
let imageDb = require("./models/image");
let express = require("express");
let apiRouter = express.Router();

mongoose.connect("mongodb://localhost/KopioGramDB", {useMongoClient:true});

//Get all users
apiRouter.get("/users", function(req,res) {
	console.log("GET /api/users");
	userDb.find(function(err,users) {
		if(err) {
			console.log("Failed to load users");
			res.status(404).json({"Message":"No users found"});
		} else {
			console.log("Result in finding users");
			res.status(200).json(users);
		}	
	});
});

// Get user by id
apiRouter.get("/user/:id", function(req,res) {
	console.log("GET /api/user/:id");
	console.log("req.params.id="+req.params.id);
	userDb.find({"id":req.params.id}, function(err, user) {
		if(err) {
			console.log("Failed to find user");
			res.status(404).json({"message":"Failed to find user"});
		} else {
			if(JSON.stringify(user) == "[]") {
				console.log("User not found");
			} else {
				console.log("Success in finding user");	
			}
			res.status(200).json(user);
		}
	});
});

// Get user by username
apiRouter.get("/username/:username", function(req,res) {
	console.log("GET /api/username/:username");
	console.log("req.params.username="+req.params.username);
	userDb.find({"username":req.params.username}, function(err, user) {
		if(err) {
			console.log("Failed to find user");
			res.status(404).json({"message":"Failed to find user"});
		} else {
			if(JSON.stringify(user) == "[]") {
				console.log("User not found");
			} else {
				console.log("Success in finding user");	
			}
			res.status(200).json(user);
		}
	});
});

//Get all images
apiRouter.get("/images", function(req,res) {
	console.log("GET /api/images");
	imageDb.find(function(err,imageFlow) {
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
	imageDb.find({"_id":id}, function(err, image) {
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
	imageDb.find({"imageId":id}, function(err, image) {
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
	imageDb.find({"imageUrl":imageUrl}, function(err, image) {
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
	imageDb.find( {"$or": [/*{ "owner": { "$regex": req.params.text, "$options": "i" }},*/
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

//TODO: Siisti koodia
// Find images for userName
apiRouter.get("/image/username/:name", function(req,res) {
	console.log("GET /api/image/username/"+req.params.text);
	console.log("req.params.name:");
	console.log(req.params.name);
	var search = req.params.name;

	userDb.findOne( {"username": req.params.name}, function(err, user) {
		if(err) {
			console.log("Failed to find image");
			res.status(404).json({"message":"Failed to find image"});
		} else {
			if(JSON.stringify(user) == "[]") {
				console.log("UserId not found");
			} else {
				console.log("Success in finding userId");	
				console.log(user);
				//---------
				//Find images for userId
				return (
					imageDb.find({ "owner": user.id}, function(err, image) {
						if(err) {
							console.log("Failed to find images");
							res.status(404).json({"message":"Failed to find images"});
						} else {
							if(JSON.stringify(image) == "[]") {
								console.log("Images not found");
								res.status(404).json({"message":"Images not found"});
							} else {
								console.log("Success in finding images");	
								res.status(200).json(image);
							}
						}
					})
				);			
				//---------	
			}
			res.status(200).json("image");
		}
	});
});

//Get images for userId
apiRouter.get("/image/userid/:id", function(req,res) {
	console.log("GET /api/image/userid/"+req.params.id);
	console.log("req.params.id:");
	console.log(req.params.id);
	var search = req.params.id;

	// Find images by userId
	imageDb.find({ "owner": req.params.id}, function(err, image) {
		if(err) {
			console.log("Failed to find images");
			res.status(404).json({"message":"Failed to find images"});
		} else {
			if(JSON.stringify(image) == "[]") {
				console.log("Images not found");
				res.status(404).json({"message":"Images not found"});
			} else {
				console.log("Success in finding images");	
				res.status(200).json(image);
			}
		}
	});
});

// Add new image 
apiRouter.post("/image", function(req,res) {
	console.log("POST /api/image");
	console.log("req.body:");
	console.log(req.body);
	var temp = new imageDb(req.body);
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

// Edit image 
apiRouter.post("/image/edit", function(req,res) {
	console.log("POST /api/image/edit");
	console.log("req.body:");
	console.log(req.body);
	var temp = new image(req.body);
	console.log("temp:");
	console.log(temp);
	//TODO: Validointia parannettava
	imageDb.findOneAndUpdate({'imageId':req.body.imageId}, req.body, {upsert:true, new: true}, function(err,item) {
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
apiRouter.delete("/image/:imageId", function(req,res) {
	console.log("Delete image");
	let id = req.params.imageId;
	imageDb.deleteOne({"imageId":id}, function(err) {
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