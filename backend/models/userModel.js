const mongoose = require("mongoose");

const userScheema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    email: { type: String, required: [true, "Please add an email"] },
    password: { type: String, required: [true, "Please add a password"] },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userScheema);
