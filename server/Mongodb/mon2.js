const mongoose = require('mongoose');
const Image = require('./models/image'); // ระบุตำแหน่งของโมเดล Image ของคุณ

const targetId = '6594be91ecd941d05910d261';

// ตรวจสอบว่า targetId เป็น ObjectId ที่ถูกต้องหรือไม่
if (!mongoose.Types.ObjectId.isValid(targetId)) {
  console.error('Invalid ID provided.');
} else {
  // ตรวจสอบว่า targetId เป็น ObjectId ที่ถูกต้องหรือไม่
  Image.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(targetId) },
    { $set: { name: 'NewName', price: 999 } }, // ตัวอย่างการอัปเดตข้อมูล
    { new: true },
    (err, updatedImage) => {
      if (err) {
        console.error('Error updating image:', err.message);
        // จัดการข้อผิดพลาดที่เกิดขึ้นในการอัปเดต
      } else {
        if (!updatedImage) {
          // ถ้าไม่พบข้อมูลที่จะอัปเดต
          console.error('Image not found for updating');
        } else {
          // ถ้าอัปเดตข้อมูลสำเร็จ
          console.log('Updated image:', updatedImage);
        }
      }
    }
  );
}