import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleHalfStroke, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './DarkMode.css'
import './NavbarText.css'
import './ContentBroder.css';

const Navbar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchText);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className={`Navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            Welcome
            <div className="navbar-nav">
              <div className="input-group">
                <div className="nav-item">
                  <input
                    type="text1"
                    placeholder="ค้นหา..."
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                  <div className="item-search">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </div>
              </div>
              <div className={`div ${isDarkMode ? 'dark-mode-text' : ''}`} onClick={toggleDarkMode}>
                  <button>
                <FontAwesomeIcon icon={faCircleHalfStroke} /> Dark
                </button>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to="/">
                  <FontAwesomeIcon icon={faHouse} />
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;