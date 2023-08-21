import React from 'react';
import { useSelector } from 'react-redux';
import BasketItem from './BasketItem/BasketItem';
import { useNavigate } from 'react-router-dom';
import './Basket.css';

const Basket = ({ onClose }) => {
  const cartItems = useSelector(state => state.basket.cartItems);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const formattedTotalAmount = `${totalAmount.toLocaleString('en-US')} грн`;

  const handleOrderClick = () => {
    navigate('/form');
  };

  return (
    <div className="basket-modal" onClick={onClose}>
      <div className="basket-content" onClick={(e) => e.stopPropagation()}>
        <div className="basket-header">
          <h2 className='basket-header-title'>Ваша корзина</h2>
          <button className="close-button" onClick={onClose}>
            Вийти
          </button>
        </div>
        <div className="basket-items">
          {cartItems.length === 0 ? (
            <p className='basket-items-no-items'>Ви не обрали жодного товару...</p>
          ) : (
            <ul className='basket-items-list'>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <BasketItem item={item} product={item.product} onClose={onClose} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='basket-final-price'>
          Загальна сума: {formattedTotalAmount}
        </div>
        <div className='basket-items-button-directory'>
          <button className='basket-items-button' onClick={onClose}>
            Повернутись до Замовлення
          </button>
          <button className='basket-items-button' onClick={() => {
            handleOrderClick();
            onClose();
          }}>
            Оформити замовлення
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;