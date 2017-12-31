let express = require("express");
let apiRouter = express.Router();
var cloudinary = require('cloudinary');

//TODO: Change real values
const CLOUD_NAME = 'DummyCloud';
const API_KEY = '3214560987';
const API_SECRET = 'jKjhoi43kLK9dMCvoe6l3Lka';

imageCloud = [];
  
 imageCloud.sendImage = function(fileName, cb) {
  
  cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET 
  });

  return cloudinary.uploader.upload(fileName, function(result) {
    return cb(result);
  });

}

module.exports = imageCloud;