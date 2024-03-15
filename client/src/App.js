import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadData from './components/UploadData/UploadData';
import ImageList from './components/ImageList/ImageList';
import './components/layout.css';
import Navbar from './components/Nav/Navbar';
import Navmenu from './components/Nav/navmenu/Navmenu'
import './components/Nav/ContentBroder.css'

function App() {
  const [imageName, setImageName] = useState('');

  return (
    <Router>
          <div className='container'>
          <header className="nav">
          <Navbar/>
          </header>

          <aside className="content">
          <div className="rotated-text">Content</div>
          </aside>

          <aside className='imagelist'>
            <div className="menu">
            <Navmenu />
            </div>
            <div className="image">
              <ImageList/>
            </div>
          </aside>

          <aside className="upload">
          <UploadData/>
          </aside>
          </div>    
    </Router>
  );
}

export default App;

//      <UploadData/>

