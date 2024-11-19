const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not vaild!!! please provide valid email!!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 500,
      trim: true,
      validate: function (value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Passwword strenth is low, give strong password");
        }
      },
    },
    phone: {
        type: String,
        required: true,
        validate: function (value) {
          const phoneRegex = /^[0-9]{10}$/; // Regex for validating 10-digit phone number
          if (!phoneRegex.test(value)) {
            throw new Error("Invalid phone number! Must be a 10-digit number.");
          }
        },
    },
  },
  { timestamps: true }
);
userSchema.methods.getJWT = async function(){
    const user = this;
      const token = await jwt.sign({_id:user._id}, "devTinder9334", {
        expiresIn: "7d",
      }) 
  
      return token;
  }
  
  
  userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
     return isPasswordValid;
  }
module.exports = mongoose.model("User", userSchema);
