const userModel = require('../models/userModel');

const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find({});
    users.forEach((user) => {
      user.password = undefined;
    });

    return res.status(200).send({
      success: true,
      message: 'Find all user successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in get all user api',
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in delete user api',
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in reset password api',
      error,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in update password api',
      error,
    });
  }
};

const updateUserProfileController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in update user api',
      error,
    });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    // find the user
    const user = await userModel.findById({ _id: req.params.id });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    user.password = undefined;

    return res.status(200).send({
      success: true,
      message: 'Find the user',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in get user by id api',
      error,
    });
  }
};

module.exports = {
  getAllUserController,
  deleteUserController,
  resetPasswordController,
  updatePasswordController,
  updateUserProfileController,
  getUserByIdController,
};
