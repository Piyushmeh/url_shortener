const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true }, // Add this field
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Url", UrlSchema);