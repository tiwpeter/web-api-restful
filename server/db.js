const mongoose = require('mongoose');

let Image;

if (mongoose.models.Image) {
  Image = mongoose.model('Image');
} else {
  //ฟิลด์ข้อมูล
  const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    image: { type: String, required: true }, // แก้ตามความเหมือนที่ต้องการ
    imageUrl: { type: String, required: true }, // แก้ตามความเหมือนที่ต้องการ  
    createdAt: { type: Date, default: Date.now },
    type: { type: String, required: true },
  });

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