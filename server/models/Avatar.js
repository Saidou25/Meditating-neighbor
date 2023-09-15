const { Schema, model } = require("mongoose");

const avatarSchema = new Schema({
  username: {
    type: String,
    required: "Please choose a username",
    trim: true,
  },
  avatarUrl: {
    type: String,
    unique: true,
  },
});

const Avatar = model("avatar", avatarSchema);

module.exports = Avatar;
