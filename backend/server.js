const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const connectDb = require("./config/connectDb");
//rest objects
const app = express();

//config  env
require("dotenv").config();

//call database
connectDb();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:3000", //local
    "https://expense-management-system-delta.vercel.app", //deployed
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
//google auth
const authRoutes = require("./routes/Auth");
app.use("/api/auth", authRoutes);
//user routes
const userRoutes = require("./routes/userRoute");
app.use("/api/v1/users", userRoutes);
//category routing
const categoryRoutes = require("./routes/category");
app.use("/api/v1/categories", require("./routes/category"));
//transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));
const PORT = 8080 || process.env.PORT;
//listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});