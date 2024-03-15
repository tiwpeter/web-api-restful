const express = require('express');
const router = express.Router();
const { Image, connectDB } = require('../models/db');

connectDB();

router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Error fetching images.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedImage);
  } catch (error) {
    console.error('Error updating image details:', error.message);
    res.status(500).json({ error: 'Error updating image details.' });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(image);
  } catch (error) {
    console.error('Error fetching image by ID:', error.message);
    res.status(500).json({ error: 'Error fetching image by ID' });
  }
});

module.exports = router;