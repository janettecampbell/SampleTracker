const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const port = 3000;
const MONGODB_URI = "mongodb+srv://Admin:TechOne2401@multi-media-app.nywmu3r.mongodb.net/Sample-Tracker-App?retryWrites=true&w=majority&appName=Multi-Media-App"

// Controller Imports
const sample = require("./controllers/sampleController")

// Connect Controller to Routes
app.use("/sample", sample)

app.get("/", (req, res) => {
  res.send({ title: "Express" });
});

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
  });
});
