import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Logo from '../../resources/image/Logo.png';
import Basket from '../Basket/Basket';

import './Header.css';

const Header = () => {

    const [basketOpen, setBasketOpen] = useState(false);

    const toggleBasket = () => {
        setBasketOpen(!basketOpen);
    };

    return (
        <header className='header-block'>
            <div className='logo-block'>
                <NavLink to="/">
                    <img className='image-logo' alt='Logo' src={Logo}></img>
                </NavLink>
            </div>
            <div className='info-block'>
                <Icon className='phone-icon' icon="ph:phone" color="green" /><a className='phone-number' href="tel:380999999999">+099-999-99-99</a>
                <Icon className='working-hours-icon' icon="typcn:time" color="green" />
                <ul className='working-hours'>
                    <li>Робочі дні: 09:00 - 18:00</li>
                    <li>Вихідні дні: 10:00 - 15:00</li>
                </ul>
            </div>
            <div className='search-block'>
                <div className='search-input'>
                    <input type='text' placeholder='Введіть назву товару' />
                    <Icon className='search-icon' icon="bi:search" color="green" width="10" height="10" />
                </div>
            </div>
            <div className='basket-block'>
                <Icon icon="fluent-emoji-high-contrast:basket" width="40" height="40" onClick={toggleBasket} />
                {basketOpen && <Basket onClose={toggleBasket} />}
            </div>
        </header>
    );
};

export default Header;