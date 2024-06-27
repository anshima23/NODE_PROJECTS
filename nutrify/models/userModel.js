const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true,
    min: 12
  }
},{timestamp:true,});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
