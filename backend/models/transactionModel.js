const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid:{
      type:String,
      required:true,
    },
    Amount: {
      type: Number,
      required: [true, "Amount Is Required"],
    },
    Type:{
      type:String,
      required:[true,"Type of Transaction is Required"],
    },
    Category: {
      type: String,
      required: [true, "Category Is Required"],
    },
    /*Reference:{
      type:String,
      required:[true,"Reference is required"],
    },*/
    Description: {
      type: String,
      required: [false, "Optional"],
    },
    Date: {
      type: Date,
      required: [true, "Date Is Required"],
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;
