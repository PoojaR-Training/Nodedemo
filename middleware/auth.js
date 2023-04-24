const jwt = require("jsonwebtoken");
function checkToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Token is not valid" });
        } else {
          req.id = decoded.id;
          next();
        }
      });
    } else {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
  }
  module.exports ={
    checkToken
  }