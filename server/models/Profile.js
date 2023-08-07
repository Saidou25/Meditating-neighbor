const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  stage: {
    type: Number,
    required: "Please enter a number",
    trim: true,
  },
  years: {
    type: Number,
    required: "Please enter a number",
    trim: true,
  },
  teacher: {
    type: String,
    required: "Are you a teacher or a meditator?",
    trim: true,
  },
});

const Profile = model("profile", profileSchema);

module.exports = Profile;
