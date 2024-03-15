// Navmenu.js
import React from 'react';
import '../ContentBroder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Navmenu = () => {
  return (


<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="content-menu">
        <div className="menu">
          Menu   
        </div>
        <div className="edit">
          <FontAwesomeIcon icon={faEdit} />
        </div>
        <div className="ooo">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        
    </div>
</nav>
  );
};

export default Navmenu;