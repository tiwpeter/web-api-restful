const mongoose = require('mongoose');
const { connectDB, Image } = require('./db');// ตัวที่มีเก็บข้อมูล วตริง
const ObjectId = mongoose.Types.ObjectId;

connectDB();

Image.distinct('_id', (err, uniqueIds) => {
  if (err) {
    console.error('Error fetching unique IDs:', err.message);
  } else {
    // ดึงข้อมูลที่ไม่ซ้ำกันจากทุก _id
    Image.find({ _id: { $in: uniqueIds } }, (err, results) => {
      if (err) {
        console.error('Error fetching documents:', err.message);
      } else {
        console.log('Results:', results);
      }
    });
  }
});

//สำหรับ แปลงไอดี _ID
// แล้ว ข้อมูลจาก imgหละ
//ในตัวอย่างนี้, เราเพิ่มเส้นทาง (route) /getImageById/:id ที่รับพารามิเตอร์ id และทำการค้นหาข้อมูลภาพจาก MongoDB โดยใช้ _id
// ที่ได้จากพารามิเตอร์ id. การตอบกลับจะเป็น JSON ที่มีข้อมูลภาพที่พบหรือ error ในกรณีที่เกิดข้อผิดพลาด.





