let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let bluebird = require("bluebird");
let contact = require("./backend/models/contact");

bluebird.promisifyAll(mongoose);
mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost/contactdb", {useMongoClient:true});

let port = 3001;

let abc = ['a','b','c','d','e','f','g','h','i','j','k','L','M','N','O','P','Q','R','S','T','0','1','2','3','4','5','6','7','8','9'];

let users = [];
let loggedUsers = [];

app.use(bodyParser.json());

app.post("/login", function(req,res){
	let username = req.body.username;
	let password = req.body.password;
	for (i=0; i<users.length; i++){
		if (username === users[i].username){
			if (password === users[i].password){
				let token = "";
				for (j=0;j<50;j++){
					let temp = Math.floor(Math.random()*30);
					token = token + abc[temp];
				}
				res.status(200).json({"token":token, "message":"Success"})
				loggedUsers.push({"username":username, "token":token})
				console.log("Logged in " +username);
				return;
			}
		}
	}
	res.status(403).json({"message":"no such user or wrong password"});
});

app.post("/logout", function(req,res){
	let temptoken = req.body.token;
	for(i=0;i<loggedUsers.length;i++){
		if (loggedUsers[i].token === temptoken){
			let tempusername = loggedUsers[i].username;
			loggedUsers.splice(i,1);
			res.status(200).json({"message":"logout success"})
			console.log("Logged out " +tempusername);
			return;
		}
	}
	res.status(404).json({"message":"not found"});
});

app.post("/register", function(req, res){
	let username = req.body.username;
	let password = req.body.password;
	for(i=0;i<users.length;i++){
		if (username === users[i].username){
			res.status(409).json({"message":"Username taken"});
			return;
		}
	}
	let user = {};
	user.username = username;
	user.password = password;
	users.push(user);
	res.status(200).json({"message":"success"});
	console.log("Registered " +username);
	
});

app.use("/api", function(req,res,next){
	let token = req.headers.token;
	for (i=0; i<loggedUsers.length;i++){
		if (loggedUsers[i].token === token){
			next();
			return;
		}
	}
	res.status(403).json({"message":"Forbidden"});	
});

app.post("/api/contactlist", function(req,res){
	let temp = new contact({
		"firstName": req.body.firstName,
		"lastName": req.body.lastName,
		"email": req.body.email,
		"phoneNumber": req.body.phoneNumber
	});
	temp.save(function(err,item) {
		if(err){
			console.log("Failed to save contact");
			res.status(409).json({"Message":"Failed to save contact"});
		}else{
			console.log("Successfully saved contact");
			res.status(200).json({"Message":"Success"});
		}
	});
});

app.get("/api/contactlist", function(req,res){
	contact.find(function(err,contactList){
		if(err){
			console.log("Failed to load contactList");
			res.status(404).json({"Message":"No list found"});
		}else{
			console.log("Result in finding contactList");
			res.status(200).json(contactList);
		}
	});
});

app.get("/", function(req,res){
	res.status(200).send("<p>Hello API</p>")
});

app.delete("/api/contactlist/:id", function(req,res){
	console.log("Delete contact");
	let id = req.params.id;
	contact.remove({"_id":id}, function(err){
		if (err){
			console.log("Failed to remove contact");
			res.status(404).json({"Message":"Failed to remove contact"});
		}else{
			console.log("Succesfully removed contact");
			res.status(200).json({"Message":"Success"});
		}
	});
});

app.listen(port);

console.log("Running in port "+port);