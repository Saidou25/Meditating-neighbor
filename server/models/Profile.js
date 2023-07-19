const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const profileSchema = new Schema({
  username: {
    type: String,
    required: "Please choose a username",
    trim: true,
  },
  avatarUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

const Profile = model("profile", profileSchema);

module.exports = Profile;
