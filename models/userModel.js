const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, 'UserName is required'],
    },
    email: {
      type: String,
      require: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Password is required'],
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      require: [true, 'Phone is required'],
    },
    userRole: {
      type: String,
      require: [true, 'UserRole is required'],
      enum: ['client', 'admin', 'vendor', 'driver'],
      default: 'client',
    },
    profileImageUrl: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
