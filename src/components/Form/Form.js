import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BasketItem from '../Basket/BasketItem/BasketItem';
import './Form.css';
import { validateForm } from '../../utils/formValidator';

const Form = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [novaPoshtaBranch, setNovaPoshtaBranch] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const cartItems = useSelector(state => state.basket.cartItems);

  const handleDeliveryMethodChange = (event) => {
    setDeliveryMethod(event.target.value);
    setNovaPoshtaBranch('');
    setAddress('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      fullName,
      phoneNumber,
      city,
      deliveryMethod,
      novaPoshtaBranch,
      address,
      paymentMethod
    };

    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      console.log('Форма содержит ошибки:', errors);
      return;
    }

  };

  const errors = validateForm({
    fullName,
    phoneNumber,
    city,
    deliveryMethod,
    novaPoshtaBranch,
    address,
    paymentMethod
  });

  return (
    <div className='form'>
      <div className='form-block'>
        <h2>Оформити замовлення</h2>
        <form className='form-area' onSubmit={handleSubmit}>
          <div>
            <label>ПІБ</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>
          <div>
            <label>Номер телефону</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>
          <div>
            <label>Місто</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </div>
          <div>
            <label>Доставка</label>
            <select value={deliveryMethod} onChange={handleDeliveryMethodChange}>
              <option value="">Виберіть метод доставки</option>
              <option value="pickup">Самовивіз</option>
              <option value="novaPoshta">Нова Пошта</option>
              <option value="courier">Кур'єром по місту</option>
            </select>
          </div>
          {deliveryMethod === 'novaPoshta' && (
            <div>
              <label>Пункт видачі Нової Пошти</label>
              <select value={novaPoshtaBranch} onChange={(e) => setNovaPoshtaBranch(e.target.value)}>
                <option value="">Виберіть пункт видачі</option>
              </select>
            </div>
          )}
          {deliveryMethod === 'courier' && (
            <div>
              <label>Адреса доставки</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          )}
          <div>
            <label>Оплата</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="">Виберіть метод оплати</option>
              <option value="online">Оплатити онлайн</option>
              <option value="cash">Післяплата готівкою</option>
              <option value="bankTransfer">Безготівковий розрахунок</option>
            </select>
          </div>
          <button type="submit">Замовити</button>
        </form>
      </div>
      <div className='form-basket-items'>
        <ul className='form-basket-items-list'>
          {cartItems.map((item, index) => (
            <li key={index}>
              <BasketItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;