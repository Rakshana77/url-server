// models/ShortUrl.js
const mongoose = require('mongoose');
const shortid = require('shortid');

const ShortUrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortId: {
    type: String,
    default: shortid.generate
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
