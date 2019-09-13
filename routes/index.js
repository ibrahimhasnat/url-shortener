const express = require('express');
const router = express.Router();
const Url = require('../model/Url');

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ message: 'Url not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      url.delete();
      return res.json({ message: 'Delete Successfully!' });
    } else {
      return res.status(404).json({ message: 'Url not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
