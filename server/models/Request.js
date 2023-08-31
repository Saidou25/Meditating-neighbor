const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
  myName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  destinationName: {
    type: String,
    trim: true,
    required: true
  },
  avatarUrl: {
    type: String,
    unique: true,
  },
});

const Request = model("Request", requestSchema);

module.exports = Request;
