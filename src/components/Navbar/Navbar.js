import React from 'react';
import { NavLink } from 'react-router-dom';
import { useProduct } from '../../context/contexts';

import './Navbar.css'

const Navbar = () => {
  const { isAuthenticated, handleLogout } = useProduct();

  return (
    <div className="Navbar">
      <nav className='nav-list'>
        <NavLink to="/seedvegetable" className='nav_list_link'>
          Насіння овочів
        </NavLink>
        <NavLink to="/seedberries" className='nav_list_link'>
          Насіння ягід
        </NavLink> 
        <NavLink to="/othergoods" className='nav_list_link'>
          Інші товари 
        </NavLink>
        {isAuthenticated ? (
          <button onClick={handleLogout} className='nav_list_link button-style'>
            Вихід
          </button>
        ) : (
          <NavLink to="/authorization" className='nav_list_link'>
            Вхід
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Navbar;