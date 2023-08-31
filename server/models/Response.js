const { Schema, model } = require("mongoose");

const responseSchema = new Schema({
  fromName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  toName: {
    type: String,
    trim: true,
  },
  avatarUrl: {
    type: String,
    unique: true,
  },
});

const Response = model("Response", responseSchema);

module.exports = Response;
