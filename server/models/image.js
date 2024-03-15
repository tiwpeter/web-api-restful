
//เช็ค
const mongoose = require('mongoose');

let Image;

if (mongoose.models.Image) {
  Image = mongoose.model('Image');
} else {
    const imageSchema = new mongoose.Schema({
        name: { type: String, required: true },
        description: { type: String },
        imageUrl: { type: String, required: true }, // นี่คือฟิลด์ imageUrl
        createdAt: { type: Date, default: Date.now },
        
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