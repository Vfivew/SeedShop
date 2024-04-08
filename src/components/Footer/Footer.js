import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

import Logo from "../../resources/image/Logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-block">
      <div className="footer-logo-block">
        <NavLink to="/">
          <img className="image-logo" alt="Logo" src={Logo}></img>
        </NavLink>
        <div className="copyright-protection">
          <span>@2023</span>
        </div>
      </div>
      <div className="footer-description-block">
        <ul className="footer-catalog-items">
          <h3 className="footer-title">Каталог:</h3>
          <li>
            <NavLink
              to="/seedvegetable"
              className="footer-list-link footer-link"
            >
              Насіння овочів
            </NavLink>
          </li>
          <li>
            <NavLink to="/seedberries" className="footer-list-link footer-link">
              Насіння ягід
            </NavLink>
          </li>
          <li>
            <NavLink to="/othergoods" className="footer-list-link footer-link">
              Інші товари
            </NavLink>
          </li>
        </ul>
        <ul className="footer-client-info">
          <h3 className="footer-title">Клієнтам:</h3>
          <li>
            <NavLink
              to="/authorization"
              className="footer-list-link footer-link"
            >
              Вхід
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tabs/contact"
              className="footer-list-link footer-link"
            >
              Контакти
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tabs/aboutsus"
              className="footer-list-link footer-link"
            >
              Про нас
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tabs/paymentdeliver"
              className="footer-list-link footer-link"
            >
              Оплата та доставка
            </NavLink>
          </li>
        </ul>
        <ul className="footer-contact-info">
          <h3 className="footer-title">Контакти:</h3>
          <li className="footer-contact-item">
            <a className="phone-number footer-link" href="tel:380999999999">
              +380(99) 999-99-99
            </a>
          </li>
          <li className="footer-contact-item">
            <a
              className="footer-link"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                className="footer-icon"
                icon="grommet-icons:instagram"
                color="currentColor"
                width="16"
                height="16"
              />
              Instagram
            </a>
          </li>
          <li className="footer-contact-item">
            <a
              className="footer-link"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                className="footer-icon"
                icon="bi:facebook"
                color="currentColor"
                width="16"
                height="16"
              />
              Facebook
            </a>
          </li>
          <li className="footer-contact-item">
            <a
              className="footer-link"
              href="https://chats.viber.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                className="footer-icon"
                icon="basil:viber-solid"
                color="currentColor"
                width="16"
                height="16"
              />
              Viber
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
