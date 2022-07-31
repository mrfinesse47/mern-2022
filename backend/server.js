const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const errorHandler = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

app.get("/", (req, res) => {
  res.status(201).json({ message: "welcome to the support desk API" });
});

//routes, the require returns a router
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);
