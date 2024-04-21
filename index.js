
const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/ShortUrl');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


mongoose.connect('mongodb://localhost/url-shortener', {
 
});
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    let url = await ShortUrl.findOne({ originalUrl });
    if (url) {
      res.json(url);
    } else {
      const shortUrl = new ShortUrl({ originalUrl });
      url = await shortUrl.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await ShortUrl.findOne({ shortId });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
