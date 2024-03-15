
//
// storage.js
const multer = require('multer');

const storage = (uploadFolder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};

module.exports = { storage };  // ให้นำออกมาเป็น Object ที่มี key เป็น "storage"
