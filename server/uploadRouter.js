// เช็ค

const express = require('express');
const multer = require('multer');
const { Image } = require('./db');

const router = express.Router();
const uploadFolder = 'upload/'; // ตั้งค่าโฟลเดอร์ที่เก็บไฟล์

// สร้าง storage จาก multer.diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// สร้าง middleware upload จาก multer
const upload = multer({ storage: storage });

//////////////////////////////////
//สร้าง ดึง name



// ใช้ middleware upload.single('image') ในการจัดการการอัปโหลดไฟล์
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // ตรวจสอบว่ามีไฟล์ที่ถูกอัปโหลดหรือไม่
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // สร้าง document ใหม่จาก Model Image
    const newImage = new Image({
      name: req.body.name,
      price: req.body.price || 0, // ตั้งค่าตามที่เหมาะสม
      imageUrl: req.file.filename,
      description: req.body.description,
      image: req.file.filename,
      type: req.body.type, // แก้ไขจาก 'dataType' เป็น 'type'
      
    });
    console.log('Request Body:', req.body);


    // บันทึก document ใหม่ลงใน MongoDB
    await newImage.save();

    // ตอบกลับเพื่อแจ้งให้ client ทราบว่าการอัปโหลดเสร็จสมบูรณ์
    res.json({ message: 'File uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(500).json({ error: 'Error uploading file.' });
  }
});

module.exports = router;