const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

//router object
const router = express.Router();

//routes
//add transaction POST Method
router.post("/addTransaction", addTransaction);

//Edit transaction POST Method
router.post("/editTransaction", editTransaction);

//Delete transaction POST Method
router.post("/deleteTransaction", deleteTransaction);

//get transactions
router.post("/getTransaction", getAllTransaction);

module.exports = router;
