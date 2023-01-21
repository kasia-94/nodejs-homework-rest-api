const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Users = mongoose.model("user", schema);

module.exports = { Users };
