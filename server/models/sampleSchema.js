const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sampleSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  styleNumber: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateReceived: {
    type: String,
    required: true,
  },
  returnToVendor: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Samples", sampleSchema);
