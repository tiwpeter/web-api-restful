//เช็ค
//อยู่ใน midleware.js

module.exports = {
    allowCORS: (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      console.log('CORS headers:', res.getHeaders());
      next();
    },
  
    fetchImages: (Image) => async (req, res) => {
      try {
        const images = await Image.find();
        res.json(images);
      } catch (error) {
        console.error('Error fetching images:', error.message);
        res.status(500).json({ error: 'Error fetching images.' });
      }
    },
  
    handleUpload: (req, res) => {
      try {
        if (!req.file) {
          res.status(400).json({ error: 'No file uploaded.' });
          return;
        }
        res.json({ message: 'File uploaded successfully.' });
      } catch (error) {
        console.error('Error uploading file:', error.message);
        res.status(500).json({ error: 'Error uploading file.' });
      }
    },
  
    // Middleware เพื่อดึงข้อมูลชื่อและ URL ของรูปภาพ
fetchNamesAndImageURLs: (Image) => async (req, res) => {
  try {
    const namesAndImageURLs = await Image.find().select({ _id: 0, name: 1, imageUrl: 1 });
    res.json(namesAndImageURLs);
  } catch (error) {
    console.error('Error fetching names and image URLs:', error.message);
    res.status(500).json({ error: 'Error fetching names and image URLs.' });
  }
},
  };

  const fetchNamesAndImageURLs = (Image) => async (req, res, next) => {
    try {
      const namesAndImageURLs = await Image.find().select({ _id: 0, name: 1, imageUrl: 1 });
      res.json(namesAndImageURLs);
    } catch (error) {
      console.error('Error fetching names and image URLs:', error.message);
      res.status(500).json({ error: 'Error fetching names and image URLs.' });
    }
  };
  
  module.exports = { fetchNamesAndImageURLs };