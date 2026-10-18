const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

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
    await userModel.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).send({
      success: true,
      message: 'Delete user successfully',
    });
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
    const { email, oldPassword, newPassword } = req.body;

    // validation input
    if (!email || !oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: 'Please provide all fields',
      });
    }

    // check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: 'User not found',
      });
    }

    // check old password
    const isMatchingOldPassword = await bcrypt.compare(
      oldPassword,
      user.password,
    );

    if (!isMatchingOldPassword) {
      return res.status(500).send({
        success: false,
        message: 'Old password is wrong',
      });
    }

    // hash new password and save
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    user.save();

    return res.status(200).send({
      success: true,
      message: 'Reset password successfully',
    });
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
    const { userName, email, address, phone } = req.body;
    const user = await userModel.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: 'User not found',
      });
    }

    if (userName) {
      user.userName = userName;
    }

    if (email && email !== user.email) {
      const existingEmail = await userModel.findOne({ email: email });
      if (!existingEmail) {
        user.email = email;
      } else {
        return res.status(500).send({
          success: false,
          message: 'Email have already registered',
        });
      }
    }

    if (address) {
      user.address = address;
    }

    if (phone) {
      user.phone = phone;
    }

    user.save();
    return res.status(200).send({
      success: true,
      message: 'update user profile successfully',
      user,
    });
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
