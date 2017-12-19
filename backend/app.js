let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let bluebird = require("bluebird");
let userDb = require("./backend/models/user");
let apiRouter = require("./backend/apirouter");
let session = require("express-session");
let mongoStore = require("connect-mongo")(session);
let localStrategy = require("passport-local");
let passport = require("passport");

let port = 3001;

//Setup things

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/KopioGramDBa", {useMongoClient:true});

let app = express();

app.use(session({
	secret: "g2hdSds28Dsf3s",
	saveUninitialized: false,
	resave: false,
	cookie: {maxAge:1000*60*60*24},
	store: new mongoStore({
		collection: "session",
		url: "mongodb://localhost/KopioGramDB",
		ttl: 24*60*60
	})
}))

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//Passport setup

passport.serializeUser(function(user,done) {
	console.log("Serialize user");
	done(null, user._id);
});

passport.deserializeUser(function(_id,done) {
	console.log("Deserialize user");
	userDb.findOne({"_id":_id}, function(err,user) {
		if (err) {
			console.log("Error in deSerializing user");
		} else {
			if(user) { console.log("User found: "+user.username); }
			return done(null, user);
		}
	});
		
});

passport.use("login-local", new localStrategy({
	usernameField: "username",
	passwordField: "password",
	passReqToCallback: true
} ,function(req, username, password, done) {
	console.log("login-local");
	userDb.findOne({"username":username}, function(err, user) {
		if(err) {
			console.log("login-local err");
			return done(null, false, {"message":"No such user or password"})
		} 
		if(!user) {
			console.log("user not found");
			return done(null, false, {"message":"No such user or password"})
		}
		console.log("isPasswordValid "+password);
		if(!user.isPasswordValid(password)) {
			console.log("Not valid password");
			return done(null, false, {"message":"No such user or password"});
		}
		console.log("done");
		return done(null, user);
		});
}));

function isUserAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		return res.status(403).json({"message":"forbidden"});
	}
}


// Login, logout, register

app.post("/login", 
	passport.authenticate("login-local",{failureRedirect:'/'}),
	function(req,res) {
		console.log("req.body.username="+req.body.username);
		console.log("/login");
		res.status(200).json({"message":"success","token":"token"});
		userDb.findOne({"username":req.body.username}, function(err,user) {
			if(err) {
				console.log("Cannot find user");
			} else {
				console.log("User found");
			}				
		});
		
});
	
app.post('/register', function(req,res) {
	console.log("register:"+JSON.stringify(req.body));
	userDb.find({"username":req.body.username}, function(err,item) {
		if(err) {
			console.log("Register: Finding existing users error");
			res.status(409).end(JSON.stringify({"message":"username already in use"}));			
			return;
		} else {
		    console.log("Register: Found existing users:"+JSON.stringify(item));
			if (item.length > 0) {
				console.log("More than zero users found");
				res.status(409).end(JSON.stringify({"message":"username already in use"}));			
				return;
			} else {						
				let temp = new userDb(req.body);
				temp.username=req.body.username;
				temp.password= temp.generateHash(req.body.password);
				
				temp.save(function(err,item) {
					if(err){
						console.log(err);
						console.log("Registering already existing username");
						res.status(409).json({"message":"username already in use"})
					} else {
						console.log("User register success");
						res.status(200).json({"message":"success"});
					}
				});
			}
		}});

});

app.post("/logout",function(req,res) {
	if(req.session) {
		req.logout();
		req.session.destroy(function(err) {
			if(err) {
				console.log("Session destroy problem:"+err);
			}
			console.log("Session destroyed");
		});
		res.status(200).json({"message":"logout success"});
		return;
	}
	res.status(404).json({"message":"bad logout"});
});

//Get sample images (amount of latest images)
app.get("/images/:amount", function(req,res) {
	let amount = 12;
	if (Number(req.params.amount) > 0) {
		amount = Number(req.params.amount);
	}
	console.log("GET /images/"+amount);
	apiRouter.getDefaultImages(amount, function(err,images) {
		if(err) {
			console.log("Failed to load images");
			res.status(404).json({"Message":"No images found"});
		} else {
			console.log("Images found");
			res.status(200).json(images);
		}	
	});
});

//Get sample images (12 latest images)
app.get("/images", function(req,res) {
	console.log("GET /images");
	apiRouter.getDefaultImages(12, function(err,images) {
		if(err) {
			console.log("Failed to load images");
			res.status(404).json({"Message":"No images found"});
		} else {
			res.status(200).json(images);
		}	
	});
});

// Get image by _id
//
// Example: Send _id, imageUrl, description, commnts and likes:
// localhost:3001/image/5a3383fab9468e19c453b9f4?comments=1&likes=1

app.get("/image/:id", function(req,res) {
	console.log("GET /image/:id");
	apiRouter.getImage(req, function(err,image) {
		if(err) {
			console.log("Failed to load image");
			res.status(404).json({"Message":"Image not found"});
		} else {
			res.status(200).json(image);
		}	
	});
});


// Contact api, middleware to check authentication

app.use("/api", isUserAuthenticated, apiRouter);

// Start server and listen

app.listen(port);

console.log("Running in port "+port);
