const mongoose = require('mongoose');
const Image = require('./models/image'); // ระบุตำแหน่งของโมเดล Image ของคุณ

const targetId = '6594be91ecd941d05910d261';

// ตรวจสอบว่า targetId เป็น ObjectId ที่ถูกต้องหรือไม่
if (!mongoose.Types.ObjectId.isValid(targetId)) {
  console.error('Invalid ID provided.');
} else {
  // ต่อไปคุณสามารถทำการค้นหาใน MongoDB ได้
  Image.findOne({ _id: mongoose.Types.ObjectId(targetId) }, (err, result) => {
    if (err) {
      console.error('Error:', err.message);
      // จัดการข้อผิดพลาดที่เกิดขึ้นในการค้นหา
    } else {
      if (!result) {
        // ถ้าไม่พบข้อมูล
        console.error('Image not found');
      } else {
        // ถ้าพบข้อมูล
        console.log(result);
      }
    }
  });
}