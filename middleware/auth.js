const jwt = require("jsonwebtoken");
var userId;
function checkToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid" });
      } else {
        userId = req.id = decoded.id;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
}

module.exports = {
  checkToken,
};
