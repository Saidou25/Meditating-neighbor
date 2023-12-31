const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: false,
    trim: true,
  },
  lastname: {
    type: String,
    required: false,
    trim: true,
  },
  stage: {
    type: String,
    required: false,
    trim: true,
  },
  years: {
    type: String,
    required: true,
    trim: true,
  },
  teacher: {
    type: String,
    required: "Are you a teacher or a meditator?",
    trim: true,
  },
  story: {
    type: String,
    trim: true,
  },
});

const Profile = model("profile", profileSchema);

module.exports = Profile;
