const express = require("express");
const router = express.Router();
const sampleModel = require("../models/sampleSchema.js");

router.get("/", async (req, res) => {
  try {
  const sample = await sampleModel.find();
  res.status(200).json(sample)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.post("/", async (req, res) => {
  try {
    const sample = await sampleModel.create(req.body);
    res.status(200).json(sample);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
