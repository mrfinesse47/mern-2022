const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;

//connect to db -- not connecting?? check IP on mongodb atlas or user credentials
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

app.get("/", (req, res) => {
  res.status(201).json({ message: "welcome to the support desk API" });
});

//routes, the require returns a router
app.use("/api/users", require("./routes/userRoutes"));

//http://expressjs.com/en/guide/error-handling.html -- explains error handling
app.use(errorHandler);
