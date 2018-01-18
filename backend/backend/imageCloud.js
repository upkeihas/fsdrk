let express = require("express");
let apiRouter = express.Router();
var cloudinary = require('cloudinary');

//TODO: Change real values
const CLOUD_NAME = 'fsdrk';
const API_KEY = '659274845159812';
const API_SECRET = '4tcWnRrxsrqzgPxKWRS78ACsMrM';

imageCloud = [];
  
 imageCloud.sendImage = function(fileName, cb) {
  
  cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET 
  });

  cloudinary.v2.uploader.upload(fileName, function(error, result) {
    return cb(result);
  });

}

module.exports = imageCloud;