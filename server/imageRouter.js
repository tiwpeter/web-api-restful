const express = require('express');
const { Image } = require('./db');
const mongoose = require('mongoose');  // นำเข้า mongoose ที่ไม่ได้นำเข้ามาในโค้ดเดิม

const router = express.Router();

// Endpoint สำหรับดึงข้อมูลรูปภาพ
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Error fetching images.' });
  }
});

// Endpoint สำหรับดึงข้อมูลรูปภาพตาม _id
router.get('/images/:name', async (req, res) => {
  try {
    const image = await Image.findOne({ name: req.params.name });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    console.error('Error fetching image by name:', error.message);
    res.status(500).json({ error: 'Error fetching image by name.' });
  }
});

module.exports = router;