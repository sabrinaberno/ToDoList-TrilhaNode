const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authConfig = require("../controller/config/auth.json");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

const getAllUser = async (req, res) => {
  try {

    const authList = await User.find();

    return res.render("home", {
      authList,
      user: null,
      email: null,
      token: null,
    });

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createUser = (req, res) => {
  res.render("register");
};

const register = async (req, res) => {
  const { email } = req.body;
   
  try {

    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "User already exists" });
    }

    const user = await User.create(req.body);
    user.password = undefined;

    return res.redirect("/task");
    
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Registration Failed" });
  }
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: "Invalid password" });
  }

  user.password = undefined;

  return res.redirect("/task");
}


module.exports = {
  getAllUser,
  register,
  createUser,
  authenticateUser,
};
