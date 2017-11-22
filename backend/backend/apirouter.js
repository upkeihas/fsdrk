let mongoose = require("mongoose");
let user = require("./models/user");
let image = require("./models/image");
let express = require("express");
let apiRouter = express.Router();

mongoose.connect("mongodb://localhost/KopioGramDB", {useMongoClient:true});

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

// Get image
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

// Get imageUrl
apiRouter.get("/image/:imageUrl", function(req,res) {
	console.log("GET /api/image/:imageUrl");
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

// Search from description
apiRouter.get("/image/search/:text", function(req,res) {
	console.log("GET /api/image/search/"+req.params.text);
	console.log("req.params.text:");
	console.log(req.params.text);
	var search = req.params.text;
	image.find(  { "description": { "$regex": req.params.text, "$options": "i" } }, function(err, image) {
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
	console.log("comments="+req.body.comments);
	var c1 = (req.body.comments);
	console.log("c1="+c1);
	console.log("c1.length="+c1.length);
	console.log("likes1="+req.body.likes);
	console.log("tags1="+req.body.tags);
	var likes = ["abcd","efgh","hjkl"];
	var tags = req.body.tags;

	var temp = new image({});
	temp.imageId = req.body.imageId;
	temp.imageUrl = req.body.imageUrl;
	temp.owner = req.body.owner;
	temp.timestamp = req.body.timestamp;
	temp.tags = req.body.tags.split(",");
	temp.description = req.body.description;
	temp.likes = req.body.likes.split(",");
	console.log("temp:");
	console.log(temp);
	var c3=req.body.comments.split(",");
	for(let a=0; a<c3.length; a++) {
		temp.comments.push(c3[a]);
	}
	
	temp.save(function(err,item) {
		if(err) {
			console.log("Failed to save image");
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