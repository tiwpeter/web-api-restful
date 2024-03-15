/// เช็ค

//อยู่ในNameAndImage.js

// Endpoint สำหรับดึงข้อมูลชื่อ + รูป +แก้ไข
const express = require('express');
const { Image } = require('./db');
const middleware = require('./middleware');

const router = express.Router();

// Middleware สำหรับ /names-and-image-urls
router.get('/names-and-image-urls', middleware.fetchNamesAndImageURLs(Image));

// API endpoint to retrieve details for a specific image by ID
router.get('/image-details/:id', async (req, res) => {
  try {
    const imageDetails = await Image.findById(req.params.id);
    res.json(imageDetails);
  } catch (error) {
    console.error('Error fetching image details:', error.message);
    res.status(500).json({ error: 'Error fetching image details.' });
  }
});

// เพิ่มเส้นทางนี้
router.get('/images-and-names', async (req, res) => {
  try {
    const imagesAndNames = await Image.find().select({ name: 1, imageUrl: 1 });
    res.json(imagesAndNames);
  } catch (error) {
    console.error('Error fetching images and names:', error.message);
    res.status(500).json({ error: 'Error fetching images and names.' });
  }
});

// Export the router
module.exports = router;



// Endpoint สำหรับดึงข้อมูลชื่อ + รูป
//router.get('/images-and-names', async (req, res) => {
 // try {
   // const imagesAndNames = await Image.find().select({ _id: 0, name: 1, imageUrl: 1 });
   // res.json(imagesAndNames);
  //} catch (error) {
   // console.error('Error fetching images and names:', error.message);
   /// res.status(500).json({ error: 'Error fetching images and names.' });
//  }
///});