const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const config = require('config');
const shortid = require('shortid');

const Url = require('../model/Url');

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({ message: 'Invalid BaseURL' });
  }

  // Generate Short Code
  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        return res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;
        url = new Url({
          longUrl,
          urlCode,
          shortUrl
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  } else {
    res.status(401).json({ message: 'Please provide a valid URL' });
  }
});

module.exports = router;
