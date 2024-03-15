const mongoose = require('mongoose');

module.exports = mongoose.model('Image', {
  filename: String,
  path: String,
});


// ไม่ใช้