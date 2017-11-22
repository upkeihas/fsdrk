let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let bluebird = require("bluebird");
let user = require("./backend/models/user");
let apiRouter = require("./backend/apirouter");
let session = require("express-session");
let mongoStore = require("connect-mongo")(session);
let localStrategy = require("passport-local");
let passport = require("passport");

let port = 3001;

//Setup things

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/KopioGramDB", {useMongoClient:true});

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
	user.findOne({"_id":_id}, function(err,user) {
		if (err) {
			console.log("Error in deSerializing user");
		} else {
			console.log("User found: "+user.username);
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
	user.findOne({"username":username}, function(err, user) {
		if(err) {
			console.log("login-local err");
			return done(null, false, {"message":"No such user or password"})
		} 
		if(!user) {
			console.log("login-local !user");
			return done(null, false, {"message":"No such user or password"})
		}
		console.log("isPasswordValid "+password);
		if(!user.isPasswordValid(password)) {
			console.log("login-local password");
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
		req.session.hello = "Hello";
		res.status(200).json({"message":"success","token":"token"});
});
	
app.post('/register', function(req,res) {
	console.log("login:"+JSON.stringify(req.body));
	user.find({"username":req.body.username}, function(err,item) {
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
				let temp = new user({});
				temp.username = req.body.username;
				temp.password = temp.generateHash(req.body.password);
				temp.email = req.body.email;
				temp.role = req.body.role;
				temp.profileImage = req.body.profileImage;
				console.log("temp:");
				console.log(temp);
				
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

// Contact api, middleware to check authentication

app.use("/api", isUserAuthenticated, apiRouter);

// Start server and listen

app.listen(port);

console.log("Running in port "+port);