import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './input.css'
import './nav.css'
import './padding.css'
import './upload.css'
import { FaPlus } from 'react-icons/fa'; // เปลี่ยน import เป็น react-icons/fa


const UploadData = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDataType, setSelectedDataType] = useState('');
  const [images, setImages] = useState([]);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3002/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('type', selectedDataType);  // เปลี่ยนชื่อฟิลด์เป็น 'type'

      const response = await axios.post('http://localhost:3002/uploadWithDetails', formData);

      // ตรวจสอบ ID ที่ได้รับจากการอัปโหลด
      console.log('Uploaded Image ID:', response.data.image._id);

      setUploadMessage(response.data.message || 'File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setUploadMessage('Error uploading file.');
    }
  };

  const handleDataTypeChange = (event) => {
    setSelectedDataType(event.target.value);
  };

  return (
    


    <div>
      <div >
          <form action="">
          <label > ชื่อ </label>
          <input
          type="text"
          id="inputData"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          </form>

          <form action="">
          <label > ราคา</label>

                <input
              type="text"
              id="priceData"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </form>

          <form action="">
          <label >คำอธิบาย</label>
          <input
            type="text"
            id="descriptionData"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          </form>



          {/* เพิ่มส่วนนี้ */}
          <div className="data-type-field">
            <label htmlFor="dataType">ประเภทข้อมูล:</label>
            <select id="dataType" name="dataType" value={selectedDataType} onChange={handleDataTypeChange}>
              <option value="กระเป๋า">กระเป๋า</option>
              <option value="ถุงเท้า">ถุงเท้า</option>
              <option value="รองเท้า">รองเท้า</option>
              <option value="ตัวเลือกเพิ่มเติม">ตัวเลือกเพิ่มเติม</option>
            </select>
          </div>

        </div>

        <div>
          {/* อัปโหลด กับ แสดงรูป */}
          {/* ข้อควาในกรอบ */}
          <div className="image-frame">
            {selectedFile && (
              <div className="image-preview">
                <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
              </div>
            )}
            <div className="upload-button">
              <label htmlFor="imageInput" className="custom-file-upload" >
                <FaPlus /> {/* ใช้ไอคอนจาก FontAwesome */}
                
              </label>
              <input type="file" id="imageInput" onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
          </div>
        </div>
        

        {/* Upload */}
        <div className="input-field">
            <button className="custom-file-upload" onClick={handleUpload}>
              <FontAwesomeIcon icon={faUpload} style={{ marginRight: '8px' }} />
              Upload
            </button>
            <p>{uploadMessage}</p>
          </div>
      </div>
  );
};

export default UploadData;

/**

      
      <div className='con'>
    <div className="data-type-field">
      <div className="pop">
        <label > ชื่อ </label>
      </div>
      
      <div className="centered-text">
      <input
      type="text"
      id="inputData"
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
      </div>



  
</div>


  <div className="data-type-field">
    <label htmlFor="dataType">ราคา:</label>
    <form>
      <input
        type="text"
        id="priceData"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </form>
  </div>

  <div className="data-type-field">
    <label htmlFor="dataType">คำอธิบาย:</label>
    <form>
      <input
        type="text"
        id="descriptionData"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  </div> 


 */