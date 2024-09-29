const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // Import the user routes

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoutes); // Apply the route under /user path

const mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl)
  .then(() => console.log("Mongoose Connected"))
  .catch((e) => console.log(e));

const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
