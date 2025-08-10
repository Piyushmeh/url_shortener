const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { nanoid } = require('nanoid');
const Url = require('./models/Url');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// mongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));


app.get('/', (req, res) => {
  res.json({ 
    message: 'URL Shortener API is running!',
    endpoints: {
      shorten: 'POST /api/shorten - Create short URL',
      redirect: 'GET /:shortcode - Redirect to original URL',
      admin: 'GET /api/admin/urls - List all URLs'
    },
    example: {
      shortUrl: `${process.env.BASE_URL}/abc123`,
      originalUrl: 'https://example.com'
    }
  });
});


app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) return res.status(400).json({ error: 'Please provide a URL' });

  try {
    let shortCode = nanoid(6);
    const newUrl = new Url({ originalUrl: longUrl, shortCode });
    await newUrl.save();

    res.json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      originalUrl: longUrl
    });
  } catch (err) {
    console.error('Error creating short URL:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/:shortcode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortcode });

    if (!url) return res.status(404).json({ error: 'URL not found' });

    url.visitCount += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error('Error retrieving URL:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/api/admin/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error('Error fetching URLs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));