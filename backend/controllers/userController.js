const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtKey, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json("User already registered");
    }

    if (!name || !email || !password) {
      return res.status(400).json("Missing required fields");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json("Invalid email");
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json("Password strength insufficient");
    }

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json("Invalid email or password");
    }

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const findUser = async (req, res) => {
    const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId)

    res.status(200).json(user)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find()

    res.status(200).json(users)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


module.exports = { registerUser, userLogin, findUser, getAllUsers };
