const { Schema, model } = require("mongoose");

const responseSchema = new Schema({
  fromName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  toName: {
    type: String,
    trim: true,
    required: true
  },
});

const Response = model("Response", responseSchema);

module.exports = Response;
