const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  // username: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  friendId: {
    type: String,
    required: true,
    trim: true,
  },
});

const Contact= model("Contact", contactSchema);

module.exports = Contact;
