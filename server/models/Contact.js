const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },
  friendId: {
    type: String,
    required: true,
    trim: true,
  },
  friendUsername: {
    type: String,
    required: true,
    trim: true,
  },
  todaysDate: {
    type: String,
    required: true,
    trim: true,
  },
  avatarUrl: {
    type: String,
    trim: true,
  },
});

const Contact= model("Contact", contactSchema);

module.exports = Contact;
