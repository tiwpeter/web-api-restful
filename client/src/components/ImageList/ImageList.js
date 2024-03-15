import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ImageListClick.css'
import './Imaglistcontianer.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Image = ({ image, setImageName }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleContainerClick = (imageId) => {
    console.log('Container Clicked - Perform your data update here');
    navigate(`/edit/${imageId}`);
  };

  const handleClick = () => {
    setIsClicked(true);
    setImageName(image.name);
    navigate(`/edit/${image._id}`);
  };

  return (
    <div
      className={`image-container ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      onClick={() => handleClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`http://localhost:3002/uploads/${image.imageUrl || ''}`}
        alt={image.name || ''}
        style={{ maxWidth: '100px', maxHeight: '100px' }}
      />
      <div className="image-details">
        <p>{image.name}</p>
      </div>

        <FontAwesomeIcon icon={faPencilAlt} />
    </div>
  );
};

const ImageList = ({ setImageName }) => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className='Click'>
      {images.map((image) => (
        <Image key={image._id} image={image} setImageName={setImageName} />
      ))}
    </div>
  );
};

export default ImageList;