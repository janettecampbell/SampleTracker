const express = require("express");
const router = express.Router();
const sampleModel = require("../models/sampleSchema.js");

router.get("/", async (req, res) => {
  try {
    const sample = await sampleModel.find();
    res.status(200).json(sample);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sample = await sampleModel.findOne({ styleNumber: id });
    res.status(200).json(sample);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const sample = await sampleModel.create(req.body);
    res.status(200).json(sample);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log(req.body)
    const sample = await sampleModel.findOneAndUpdate(
      { styleNumber: id },
      updateData,
      { new: true }
    );

    if (!sample) {
      return res
        .status(404)
        .json({ message: `Cannot find sample with style number ${id}` });
    }

    const updatedSample = await sampleModel.findOne({ styleNumber: id });

    res.status(200).json(updatedSample);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sample = await sampleModel.findOneAndDelete({ styleNumber: id });

    if (!sample) {
      return res
        .status(404)
        .json({ message: `Cannot find any samples with style number ${id}.` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
