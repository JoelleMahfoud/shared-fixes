const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/User")


verifyToken = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    User.findById(decoded.userId, {password: 0},function (err, user) {
      ;
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
     
      res.status(200).send(user);
    })
    });
} 

const authJwt = {
  verifyToken,
};

module.exports = authJwt;