const mongoose = require("mongoose");
const defaultCategories = [
  "Salary",
  "Trading",
  "Investment",
  "Movie",
  "Bills",
  "Medical",
  "Fees",
  "Food",
  "Loan",
  "Other",
];
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: [String],
    default: defaultCategories,
  },
});
{
  timestamps: true;
}

const userModel = mongoose.model("users", userschema);
module.exports = userModel;
