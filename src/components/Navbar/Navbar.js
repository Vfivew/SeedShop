import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useProduct } from '../../context/contexts';
import { Icon } from '@iconify/react';

import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, handleLogout } = useProduct();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="Navbar">
      <nav className={`nav-list ${isMenuOpen ? 'menu-open' : ''}`}>
        <NavLink to="/seedvegetable" className="nav_list_link" onClick={toggleMenu}>
          Насіння овочів
        </NavLink>
        <NavLink to="/seedberries" className="nav_list_link" onClick={toggleMenu}>
          Насіння ягід
        </NavLink>
        <NavLink to="/othergoods" className="nav_list_link" onClick={toggleMenu}>
          Інші товари
        </NavLink>
        {isAuthenticated ? (
          <button onClick={() => { handleLogout(); toggleMenu(); }} className="nav_list_link button-style">
            Вихід
          </button>
        ) : (
          <NavLink to="/authorization" className="nav_list_link" onClick={toggleMenu}>
            Вхід
          </NavLink>
        )}
      </nav>
      <div className="menu-toggle">
        {isMenuOpen ? (
          <Icon
          icon="material-symbols:close"
          onClick={toggleMenu}
          className="icon" />
          ) : (
          <Icon 
          icon="material-symbols:menu" 
          onClick={toggleMenu}
          className="icon" />
        )}
      </div>
    </div>
  );
};

export default Navbar;