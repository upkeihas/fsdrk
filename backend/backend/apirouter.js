let _ = require('lodash');
let mongoose = require("mongoose");
let userDb = require("./models/user");
let imageDb = require("./models/image");
let express = require("express");
let apiRouter = express.Router();

apiRouter.currentUser = new userDb();

apiRouter.setCurrentUser = function(user) {
	apiRouter.currentUser = user;
	console.log(apiRouter.currentUser);
}

apiRouter.getCurrentUser = function(user) {
	return apiRouter.currentUser;
}

// Users

removePassword = function(users) {
	let list = _.map(users, function(user) {
		return _.omit(user, 'password'); 
	});
	return list;
};

//Get all users
apiRouter.get("/users", function(req,res) {
	console.log("GET /api/users");
	userDb.find().lean().exec(function(err,users) {
		if(err) {
			console.log("Failed to load users");
			res.status(404).json({"Message":"No users found"});
		} else {
			console.log("Success in finding users");
			res.status(200).json(removePassword(users));
		}	
	});
});

// Get user by id
apiRouter.get("/user/:id", function(req,res) {
	console.log("GET /api/user/:id");
	console.log("req.params.id="+req.params.id);
	userDb.find({"_id":req.params.id}).lean().exec(function(err, user) {
		if(err) {
			console.log("Failed to find user");
			res.status(404).json({"message":"Failed to find user"});
		} else {
			if(JSON.stringify(user) == "[]") {
				console.log("User not found");
			} else {
				console.log("Success in finding user");	
			}
			res.status(200).json(removePassword(user));
		}
	});
});

// Get user by username
apiRouter.get("/username/:username", function(req,res) {
	console.log("GET /api/username/:username");
	console.log("req.params.username="+req.params.username);
	userDb.find({"username":req.params.username}).lean().exec(function(err, user) {
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

// Find user by seaching substring from username
apiRouter.get("/user/search/:text", function(req,res) {
	console.log("GET /api/user/search/"+req.params.text);
	console.log("req.params.text:");
	console.log(req.params.text);
	var search = req.params.text;
	userDb.find( { "username": { "$regex": req.params.text, "$options": "i" }} )
		.lean().exec(function(err, user) {
		if(err) {
			console.log("Failed to find user. Error:"+err.message);
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

// Edit user data
apiRouter.post('/user/edit', function(req,res) {
	console.log("/user/edit:"+JSON.stringify(req.body));
		let temp = new userDb(req.body);
		// Check user rights to edit data

		if(apiRouter.getCurrentUser().username === temp.username) {
			console.log("Users own profile");

			// Read profile from mongoDb
			let status = userDb.findOne({'username':temp.username}, 
				function(err,user) {
				if(err) {
					console.log("user edit: Cannot edit user data. Err:"+err.message);
					res.status(409).end(JSON.stringify({"message":"Cannot edit user data"}));			
					return;
				} else {
					// Old values copied to empty places because some object properties cannot removed
					temp._id = user._id;
					if(req.body.password != undefined) { temp.password = req.body.password; }
					if(req.body.email === undefined) { temp.email = user.email; }
					if(req.body.images === undefined) { temp.images = user.images; }
					if(req.body.follower === undefined) { temp.follower = user.follower; }
					if(req.body.following === undefined) { temp.following = user.following; }
					if(req.body.profileImage === undefined) { temp.profileImage = user.profileImage; }
					if(req.body.userType === undefined) { temp.userType = user.userType; }
					if(req.body.adminEnabled === undefined) { temp.adminEnabled = user.adminEnabled; }
					// Check is password changed
					if(req.body.newPassword) {
						console.log("password changed");
						// Check is old password valid
						if(!user.isPasswordValid(temp.password)) {
							console.log("User authization failed");
							res.status(409).end(JSON.stringify({"message":"user authization failed"}));			
							return;							
						}
						console.log("temp.password       1="+temp.password);
						// generate new hash to password field
						temp.password=temp.generateHash(req.body.newPassword);
						console.log("req.body.newPassword="+req.body.newPassword);
						console.log("temp.password       2="+temp.password);
					} else {
						console.log("password not changed");
						// if password not changed, do not write it to mongoDb
						delete temp.password;
					}

					// Update changes to mongo document
					userDb.findOneAndUpdate({'username':temp.username}, temp, 
					{upsert:true, new: true}, function(err,user) {
						if(err) {
							console.log("user edit: Cannot edit user data. Err:"+err.message);
							res.status(409).end(JSON.stringify({"message":"Cannot edit user data"}));			
							return;
						} else {
							console.log("user modified");
							res.status(200).end(JSON.stringify({"message":"user modified"}));			
							return;
						}
					});
				}
			});
		} else {

			//TODO: Admin-oikeudet eivät vielä toimi => toiminta ohitettu

			console.log("Admin operations are not supported yet!");
			res.status(409).end(JSON.stringify({"message":"Admin operations are not supported yet!"}));			
			return;

			// Check admin user rights
			console.log("check admin");
			if(apiRouter.getCurrentUser().adminRights && apiRouter.getCurrentUser().userType) {
				console.log("admin");

				//TODO: Lisää tähän admin-käyttäjän salasanan tarkistus


				// Read profile from mongoDb
				let status = userDb.findOne({'username':temp.username}, 
				function(err,user) {
				if(err) {
					console.log("user edit: Cannot edit user data. Err:"+err.message);
					res.status(409).end(JSON.stringify({"message":"Cannot edit user data"}));			
					return;
				} else {
					// Old values copied to empty places because some object properties cannot removed
					temp._id = user._id;
					if(req.body.password != undefined) { temp.password = req.body.password; }
					if(req.body.email === undefined) { temp.email = user.email; }
					if(req.body.images === undefined) { temp.images = user.images; }
					if(req.body.follower === undefined) { temp.follower = user.follower; }
					if(req.body.following === undefined) { temp.following = user.following; }
					if(req.body.profileImage === undefined) { temp.profileImage = user.profileImage; }
					if(req.body.userType === undefined) { temp.userType = user.userType; }
					if(req.body.adminEnabled === undefined) { temp.adminEnabled = user.adminEnabled; }
					// Check is password changed
					if(req.body.newPassword) {
						console.log("password changed");
						// Check is old password valid
						if(!user.isPasswordValid(temp.password)) {
							console.log("User authization failed");
							res.status(409).end(JSON.stringify({"message":"user authization failed"}));			
							return;							
						}
						console.log("temp.password       1="+temp.password);
						// generate new hash to password field
						temp.password=temp.generateHash(req.body.newPassword);
						console.log("req.body.newPassword="+req.body.newPassword);
						console.log("temp.password       2="+temp.password);
					} else {
						console.log("password not changed");
						// if password not changed, do not write it to mongoDb
						delete temp.password;
					}

					// Update changes to mongo document
					userDb.findOneAndUpdate({'username':temp.username}, temp, 
					{upsert:true, new: true}, function(err,user) {
						if(err) {
							console.log("user edit: Cannot edit user data. Err:"+err.message);
							res.status(409).end(JSON.stringify({"message":"Cannot edit user data"}));			
							return;
						} else {
							console.log("user modified");
							console.log("user:");
							console.log(user);
							res.status(200).end(JSON.stringify({"message":"user modified"}));			
							return;
						}
					});
				}
			});
			console.log("status="+status);
		}
	}
});

// Images

apiRouter.getDefaultImages = function(amount, callback) {
	console.log("getDefaultImages");
	imageDb.find().sort({_id:-1}).limit(amount).lean().exec(function(err,images) {
		if(err) {
			console.log("Failed to load images. Error:"+err.message);
			return callback(err,images);
		} else {
			console.log("Success in finding images");
			return callback(err,images);
		}	
	});
};

//Get all images
apiRouter.get("/images", function(req,res) {
	console.log("GET /api/images");
	imageDb.find().lean().exec(function(err,images) {
		if(err) {
			console.log("Failed to load images. Error:"+err.message);
			res.status(404).json({"Message":"No images found"});
		} else {
			console.log("Success in finding images");
			res.status(200).json(images);
		}	
	});
});

// Get image by id
apiRouter.get("/image/:id", function(req,res) {
	console.log("GET /api/image/:id");
	console.log("req.params.id="+req.params.id);
	let id = req.params.id;
	imageDb.find({"_id":id}).lean().exec(function(err, image) {
		if(err) {
			console.log("Failed to find image. Error:"+err.message);
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
	imageDb.find({"imageId":id}).lean().exec(function(err, image) {
		if(err) {
			console.log("Failed to find image. Error:"+err.message);
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
	imageDb.find({"imageUrl":imageUrl}).lean().exec(function(err, image) {
		if(err) {
			console.log("Failed to find image. Error:"+err.message);
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
	imageDb.find( {"$or": [/*{ "userId": { "$regex": req.params.text, "$options": "i" }},*/
		{ "description": { "$regex": req.params.text, "$options": "i" }},
		{"tags": { "$regex": req.params.text, "$options": "i" }},
		{"comments.comment": { "$regex": req.params.text, "$options": "i" } }]}).lean().exec(function(err, image) {
		if(err) {
			console.log("Failed to find image. Error:"+err.message);
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

	var before = new Date()
	userDb.findOne( {"username": req.params.name}).lean().exec(function(err, user) {
		if(err) {
			console.log("Failed to find image. Error:"+err.message);
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
					imageDb.find({ "userId": user._id}, function(err, image) {
						if(err) {
							console.log("Failed to find images. Error:"+err.message);
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
	var after = new Date()
	var execution_mills = after - before
	console.log("execution time = "+execution_mills+" ms");
});

//Get images for userId
apiRouter.get("/image/userid/:id", function(req,res) {
	console.log("GET /api/image/userid/"+req.params.id);
	console.log("req.params.id:");
	console.log(req.params.id);
	var search = req.params.id;

	// Find images by userId
	imageDb.find({ "userId": req.params.id}).lean().exec(function(err, image) {
		if(err) {
			console.log("Failed to find images. Error:"+err.message);
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
	var temp = new imageDb(req.body);
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
			console.log("Failed to remove image. Error:"+err.message);
			res.status(404).json({"message":"Failed to remove image"});
		} else {
			console.log("Success in removing image");
			res.status(200).json({"message":"success"});
		}
	});
});

//TODO: Lisää vielä:
// peukutus
// kommentin lisääminen
// oman kommentin poistaminen 
// oman kommentin editointi?
// profiilikuvan tallennus
// profiilikuvan muokkaus
// profiilikuvan poisto
// seurattavan käyttäjän lisääminen
// seurattavan käyttäjän poistaminen
// salasanan vaihto
// omien profiilitietojen päivitys
// ilmiannetuille kuville oma collection mongoon

module.exports = apiRouter;