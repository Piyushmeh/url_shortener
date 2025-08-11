const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");

const router = express.Router();

// Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Please provide a URL" });
  }

  try {
    const urlCode = shortid.generate();
    const shortUrl = `${req.protocol}://${req.get("host")}/${urlCode}`;

    const newUrl = new Url({
      longUrl,
      shortUrl,
    });

    await newUrl.save();
    res.json(newUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Redirect to long URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: { $regex: req.params.code } });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: "No URL found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
