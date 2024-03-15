//เช็ค
const mongoose = require('mongoose');

let Image;

if (mongoose.models.Image) {
  Image = mongoose.model('Image');
} else {
  // กำหนดโครงสร้างของข้อมูลภาพใน MongoDB
  const imageSchema = new mongoose.Schema({
    // รายละเอียดข้อมูลภาพ เช่น ชื่อ, คำอธิบาย, ไฟล์รูป, เวลาสร้าง, เป็นต้น
    name: { type: String, required: true },
    description: { type: String },
    price: Number,  // ตรวจสอบว่ามีการระบุ price ที่นี่
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, required: true }, // เพิ่มฟิลด์ "type" ที่นี่
  });

  // สร้าง Model จาก Schema
  Image = mongoose.model('Image', imageSchema);
}

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/myshopping', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = { Image, connectDB };