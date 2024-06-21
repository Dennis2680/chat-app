const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(`live server listening on port ${port}`);
});

mongoose
  .connect(uri, {})
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("failed to connect to db" + err.message));
