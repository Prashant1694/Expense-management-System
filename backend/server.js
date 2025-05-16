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
require('dotenv').config();

//call database
connectDb();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
const corsOptions = {
  origin: [
    'http://localhost:3000',  // Allow requests from localhost for local development
    'https://expense-management-system-delta.vercel.app' // Allow requests from Vercel-deployed frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.options('*', cors(corsOptions)); //preflight requests globally
//app.use(express.static("public"));
app.use(cors(corsOptions));
//google auth
const authRoutes = require('./routes/Auth');
app.use('/api/auth', authRoutes);
//user routes
//routes
const userRoutes = require('./routes/userRoute');
app.use('/api/v1/users', userRoutes);

app.use("/api/v1/transactions", require("./routes/transactionRoutes"));
const PORT = 8080 || process.env.PORT;

//listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
