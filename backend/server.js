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
dotenv.config();

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
app.options('*', cors(corsOptions)); // This handles preflight requests globally
//app.use(express.static("public"));
app.use(cors(corsOptions));

//user routes
//routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));
//static files
//app.use(express.static(path.join(__dirname, "./client/build")));

//app.get("*", function (req, res) {
// res.sendFile(path.join(__dirname, "./client/build/index.html"));
//});
//port
const PORT = 8080 || process.env.PORT;

//listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
