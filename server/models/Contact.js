const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  friendId: {
    type: String,
    required: true,
    trim: true,
  },
  todaysDate: {
    type: String,
    required: true,
    trim: true,
  },
});

const Contact= model("Contact", contactSchema);

module.exports = Contact;
