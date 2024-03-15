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
    
  );
};


  export default UploadData;
