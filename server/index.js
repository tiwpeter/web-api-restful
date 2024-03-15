//ตัวหลัก

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const uploadRouter = require('./uploadRouter');
const cors = require('cors');
const { Image, connectDB } = require('./db');
const imagesRouter = require('./routes/images');
const { storage } = require('./storage');
const bodyParser = require('body-parser');
const namesRouter = require('./nameRouter');
const middleware = require('./middleware');

const app = express();
const port = 3002;

const uploadFolder = 'upload/';
const storageConfig = storage(uploadFolder);
const upload = multer({ storage: storageConfig });

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', imagesRouter);
app.use('/uploads', express.static('upload'));

connectDB();

// เพิ่มตัวเก็บ ID
const ObjectId = mongoose.Types.ObjectId;
app.get('/getImageById/:name', (req, res) => {
  const targetId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(targetId)) {
    return res.status(400).json({ error: 'Invalid ID provided.' });
  }
  
  Image.findOne({ _id: mongoose.Types.ObjectId(targetId) }, (err, result) => {
    // โค้ดที่เหลือ...
  });
///
  if (targetId === 'getImageById') {
    return res.status(400).json({ error: 'Invalid ID provided.' });
  }

  // ตรวจสอบว่า targetId ไม่ใช่ "undefined" หรือไม่
  if (targetId === undefined || targetId === 'undefined') {
    return res.status(400).json({ error: 'Invalid ID provided.' });
  }

  // ตรวจสอบว่า targetId เป็น ObjectId ที่ถูกต้องหรือไม่
  if (!mongoose.Types.ObjectId.isValid(targetId)) {
    return res.status(400).json({ error: 'Invalid ID provided.' });
  }

  // ต่อไปคุณสามารถทำการค้นหาใน MongoDB ได้
  Image.findOne({ _id: mongoose.Types.ObjectId(targetId) }, (err, result) => {
    if (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (!result) {
        // ถ้าไม่พบข้อมูล
        res.status(404).json({ error: 'Image not found' });
      } else {
        // ถ้าพบข้อมูล
        res.json(result);
      }
    }
  });
});

// ตัวดึง ID
app.get('/images/:name', async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบค่า id ว่าไม่ได้เป็น "undefined" หรือไม่
    if (!id) {
      console.error('Error: ID is undefined or null');
      return res.status(404).json({ message: 'Image not found' });
    }

    // ตรวจสอบความถูกต้องของ ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Error: Invalid ID provided');
      return res.status(400).json({ message: 'Invalid ID provided' });
    }

    // แปลงค่า id เป็น ObjectId
    const imageId = mongoose.Types.ObjectId(id);

    const image = await Image.findById(mongoose.Types.ObjectId(req.params.id));

    if (!image) {
      console.error('Error: Image not found');
      return res.status(404).json({ message: 'Image not found' });
    }

    // ถ้าคุณต้องการดู ID ที่ส่งผ่าน URL parameter
    console.log('Image ID:', image._id);

    res.json(image);
  } catch (error) {
    console.error('Error fetching image by ID:', error.message);
    res.status(500).json({ message: 'Error fetching image by ID' });
  }
});

// อัปโหลดรูปพร้อมรายละเอียด
app.post('/uploadWithDetails', upload.single('file'), async (req, res) => {
  try {
    // ทำตรวจสอบว่าไฟล์ถูกอัปโหลดสำเร็จหรือไม่
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // ดำเนินการบันทึกข้อมูลลงใน MongoDB
    const newImage = new Image({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price || '0',
      description: req.body.description,
      image: req.file.filename,
      imageUrl: req.file.filename,
      type: req.body.type,
    });

    await newImage.save();

    // ส่งข้อมูลที่ต้องการให้กับ client
    res.json({
      message: 'File uploaded successfully with details.',
      image: {
        name: newImage.name,
        price: newImage.price,
        description: newImage.description,
        imageUrl: newImage.imageUrl,
        type: newImage.type,
      },
    });
  } catch (error) {
    console.error('Error uploading file with details:', error.message);
    res.status(500).json({ error: 'Error uploading file with details.' });
  }
});

// แก้ไขข้อมูลภาพ
app.put('/images/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบค่า id ว่าไม่ได้เป็น "undefined" หรือไม่
    if (!id) {
      console.error('Error: ID is undefined or null');
      return res.status(404).json({ message: 'Image not found' });
    }

    // ตรวจสอบความถูกต้องของ ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Error: Invalid ID provided');
      return res.status(400).json({ message: 'Invalid ID provided' });
    }

    // แปลงค่า id เป็น ObjectId
    const imageId = mongoose.Types.ObjectId(id);

    // ในตัวอย่างนี้คือการอัปเดตข้อมูลของภาพ
    const updatedImage = await Image.findByIdAndUpdate(imageId, req.body, { new: true });

    if (!updatedImage) {
      console.error('Error: Image not found for updating');
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(updatedImage);
  } catch (error) {
    console.error('Error updating image:', error.message);
    res.status(500).json({ message: 'Error updating image' });
  }
});
///////////////////////////////////////////////////////////////ส่วนmongoDB

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});