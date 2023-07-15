const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
username: {
    type: String,
    required: true,
    unique: true
  },
longitude: {
    type: String,
    required: true,
    minlength: 5,
  },
  latitude: {
    type: String,
    required: true,
    minlength: 5,
  },
  city: {
    type: String,
    required: true,
    minlength: 5,
  },
  state: {
    type: String,
    required: true,
    minlength: 5,
  },
  country: {
    type: String,
    required: true,
    minlength: 5,
  }
});

const Location = model("location", locationSchema);

module.exports = Location;