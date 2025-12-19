import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// function for create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

//function for user login
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking user already exists or not
    const isExists = await userModel.findOne({ email });
    if (isExists) {
      return res.status(500).json({
        success: false,
        message: "User Already Exists with this email..!!",
      });
    }
    //validating email and strong password
    if (!validator.isEmail(email)) {
      return res.status(500).json({
        success: false,
        message: "Please enter a valid email..!!",
      });
    }
    if (password.length < 8) {
      return res.status(500).json({
        success: false,
        message: "Please enter a strong password..!!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User Registered Successfull..!!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//function for user registration
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User doesn't exist..!!",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid credentials..!!",
      });
    }

    // generate token
    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "User Logged in Successfully..!!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//function for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });
      return res.status(200).json({
        success: true,
        message: "Admin Logged in successfully..!!",
        token,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Invalid Credentials..!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { loginUser, registerUser, adminLogin };
