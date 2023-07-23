const { Schema, model } = require("mongoose");

const avatarSchema = new Schema({
  username: {
    type: String,
    required: "Please choose a username",
    unique: true,
    trim: true,
  },
  avatarUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

const Avatar = model("avatar", avatarSchema);

module.exports = Avatar;
