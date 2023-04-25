const User = require("../model/model_user");
const jwt = require("jsonwebtoken");

//User Register and Login
async function userRegister(req, res) {
  try {
    const register = await User.create(req.body)
    res.status(200).json(register);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function userLogin(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const result = req.body.password === user.password;
      if (result) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "60m",
        });
        res.status(200).json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  userLogin,
  userRegister,
};
