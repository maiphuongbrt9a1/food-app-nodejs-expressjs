const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone } = req.body;

    // validation
    if (!userName || !email || !password || !phone) {
      return res.status(500).send({
        success: false,
        message: 'Please provide all fields',
      });
    }

    // check user existing
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: 'Email already registered. Please login ',
      });
    }

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    // delete the password before return
    newUser.password = undefined;
    return res.status(201).send({
      success: true,
      message: 'Create new user successfully',
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in register API',
      error: error,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: 'please provide email and password',
      });
    }

    // check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: 'login info is invalid',
      });
    }

    // sign token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });

    // hide password before return
    user.password = undefined;

    // return
    return res.status(200).send({
      success: true,
      message: 'Login successfully',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in login api',
      error,
    });
  }
};

module.exports = { registerController, loginController };
