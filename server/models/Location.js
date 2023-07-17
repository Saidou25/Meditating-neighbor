const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  longitude: {
    type: Number,
    required: true,
    minlength: 5,
  },
  latitude: {
    type: Number,
    required: true,
    minlength: 5,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Location = model("Location", locationSchema);

module.exports = Location;
