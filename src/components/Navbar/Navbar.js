import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css'

const Navbar = () => {
    return (
    <div className="Navbar">
    <nav className='nav-list'>
        <NavLink to="/seedvegetable" className='nav_list_link'>
          Насіння овочів
        </NavLink>
        <NavLink to="/seedfruit" className='nav_list_link'>
          Насіння ягід
        </NavLink> 
        <NavLink to="/othergoods" className='nav_list_link'>
          Інші товари 
        </NavLink>
        <NavLink to="/authorization" className='nav_list_link'>
          Вхід
        </NavLink>
    </nav>
    </div>
    );
};

export default Navbar;