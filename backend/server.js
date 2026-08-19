const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
require("dotenv").config();

//Set DNS
const dns = require("dns");
dns.setServers(["8.8.8.8"]);

//Connect DB with server
const connectDB = require("./config/db");

const app = express();

//use miidleware
app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRoutes);

// test Route
app.get("/", (req, res) => {
  res.send("Job Book-mark API is running");
});

//Calling function
connectDB();

//PORT
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
