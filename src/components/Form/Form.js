import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setDeliveryMethod, setIsOrderPlaced } from '../../reducers/formReducer'; 
import BasketItem from '../Basket/BasketItem/BasketItem';

import './Form.css';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });

  const cartItems = useSelector(state => state.basket.cartItems);
  const { deliveryMethod, isOrderPlaced } = useSelector(state => state.form); 

  const onSubmit = (data) => {
    console.log(data);
    dispatch(setIsOrderPlaced(true));
  };

  const closeModal = () => {
    dispatch(setIsOrderPlaced(false));
    navigate('/');
    localStorage.removeItem('isOrderPlaced');
    localStorage.removeItem('cartItems');
    window.location.reload();
  };

  return (
    <div className='form'>
      <div className='form-block'>
        <h2>Оформити замовлення</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Ім'я</label>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: 'Це поле обов\'язкове',
                pattern: {
                  value: /^[А-ЯЁа-яёІіЇїЄєҐґ]+$/,
                  message: 'Введіть правильне ім\'я'
                }
              }}
              defaultValue="" 
              render={({ field }) => <input {...field} />}
            />
            {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
          </div>
          <div>
            <label>Фамілія</label>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: 'Це поле обов\'язкове',
                pattern: {
                  value: /^[А-ЯЁа-яёІіЇїЄєҐґ]+$/,
                  message: 'Введіть правильну фамілію'
                }
              }}
              defaultValue="" 
              render={({ field }) => <input {...field} />}
            />
            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
          </div>
          <div>
            <label>Номер телефону</label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: 'Це поле обов\'язкове',
                pattern: {
                  value: /^\+380\d{9}$/,
                  message: 'Введіть правильний номер телефону. (Формат: "+380998765432")'
                }
              }}
              defaultValue="" 
              render={({ field }) => <input {...field} />}
            />
            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <label>Місто</label>
            <Controller
              name="city"
              control={control}
              rules={{
              required: 'Це поле обов\'язкове',
                pattern: {
                value: /^[А-ЯЁа-яёІіЇїЄєҐґ]+$/,
                message: 'Введіть правильну назву міста'
                }
              }}
              defaultValue="" 
              render={({ field }) => <input {...field} />}
            />
            {errors.city && <p className="error-message">{errors.city.message}</p>}
          </div>
          <div>
            <label>Доставка</label>
            <Controller
              name="delivery"
              control={control}
              render={({ field }) => (
                <select {...field} onChange={(e) => setDeliveryMethod(e.target.value)}>
                  <option value="pickup">Самовивіз</option>
                  <option value="novaPoshta">Нова Пошта</option>
                  <option value="courier">Кур\'єром по місту</option>
                </select>
              )}
            />
            {errors.delivery && <p className="error-message">{errors.delivery.message}</p>}
          </div>
          {deliveryMethod === 'novaPoshta' && (
            <div>
              <label>Вкажіть пункт видачі</label>
              <Controller
                name="novaPoshtaPoint"
                control={control}
                rules={{ required: 'Це поле обов\'язкове' }}
                render={({ field }) => <input {...field} />}
                defaultValue="" 
              />
              {errors.novaPoshtaPoint && <p className="error-message">{errors.novaPoshtaPoint.message}</p>}
            </div>
          )}
          {deliveryMethod === 'courier' && (
            <div>
              <label>Адрес доставки</label>
              <Controller
                name="deliveryAddress"
                control={control}
                rules={{ required: 'Це поле обов\'язкове' }}
                render={({ field }) => <input {...field} />}
                defaultValue="" 
              />
              {errors.deliveryAddress && <p className="error-message">{errors.deliveryAddress.message}</p>}
            </div>
          )}
          <div>
            <button className='button-sumbit' type="submit" disabled={!isValid || cartItems.length === 0}>Відправити</button>
          </div>
        </form>
      </div>
      <div className='form-basket-items'>
        <ul className='form-basket-items-list'>
    {cartItems.length === 0 ? (
      <p className='form-basket-item-message'>Ви не обрали жодного товару...</p>
    ) : (
      cartItems.map((item, index) => (
      <li key={index}>
        <BasketItem item={item} product={item.product} />
      </li>
      ))
    )}
  </ul>
      </div>
      {isOrderPlaced && (
          <div className="modal">
            <div className="modal-content">
              <h3>Дякуємо за замовлення</h3>
              <p>Наш оператор скоро з вами зв'яжеться</p>
              <button onClick={closeModal}>На головну</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Form;