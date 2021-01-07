const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    jwt.verify(token, config.get('privateAuthKey'), (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
