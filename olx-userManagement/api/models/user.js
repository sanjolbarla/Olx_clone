"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  fullName: {
    type: String,
    required: "Kindly enter your fullname",
  },

  email: {
    type: String,
    required: "kindly enter your email",
    unique: true,
  },
  password: {
    type: String,
    required: "Kindly enter the password",
  },
  role: {
    type: String,
    default: "user",
  },
  phone: {
    type: String,
    required: "enter phone number",
    unique: true,
  },
  // country:{
  //   type:String,
  //   required:"enter country"

  // },
  // city:{
  //   type:String,
  //   required:"enter city"
  // },
  favorites: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);
