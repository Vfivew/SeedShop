import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Logo from '../../resources/image/Logo.png';

import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer-block'>
            <div className='footer-logo-block'>
                <NavLink to="/">
                    <img className='image-logo' alt='Logo' src={Logo}></img>
                </NavLink>
                <div className='copyright-protection'>
                    <span>@2023</span>
                </div>
            </div>
            <div className='footer-description-block'>
                <ul className='footer-catalog-items'>
                    <h3>Каталог:</h3>
                    <NavLink to="/seedvegetable" className='nav_list_link'>
                    Насіння овочів
                    </NavLink>
                    <NavLink to="/seedberries" className='nav_list_link'>
                    Насіння ягід
                    </NavLink> 
                    <NavLink to="/othergoods" className='nav_list_link'>
                    Інші товари 
                    </NavLink>
                </ul>
                <ul className='footer-client-info'>
                    <h3>Клієнтам:</h3>
                    <NavLink to="/authorization" className='nav_list_link'>
                        Вхід
                    </NavLink>
                    <NavLink to="/tabs/contact" className='nav_list_link'>
                        Контакти
                    </NavLink>
                    <NavLink to="/tabs/aboutsus" className='nav_list_link'>
                        Про нас 
                    </NavLink>
                    <NavLink to="/tabs/paymentdeliver" className='nav_list_link'>
                        Оплата та доставка
                    </NavLink>
                </ul>
                <ul className='footer-contact-info'>
                    <h3>Контакти:</h3>
                    <li><a className='phone-number' href="tel:380999999999">+099-999-99-99</a></li>
                    <li>
                        <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                        <Icon className='footer-icon' icon="grommet-icons:instagram" color="black" width="16" height="16" />Instagram
                        </a>
                    </li>
                    <li>
                        <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
                        <Icon className='footer-icon' icon="bi:facebook" color="black" width="16" height="16" />Facebook
                        </a>
                    </li>
                    <li>
                        <a href='https://chats.viber.com/' target='_blank' rel='noopener noreferrer'>
                        <Icon className='footer-icon' icon="basil:viber-solid" color="black" width="16" height="16" />Viber
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;