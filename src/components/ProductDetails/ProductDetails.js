import React, { useState } from 'react';
import { useProduct } from '../../context/contexts';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../reducers/basketReducer';
import './ProductDetails.css';
import Tabs from '../Tabs/Tabs';
import Basket from '../Basket/Basket';

function ProductDetails() {
  const { selectedProduct } = useProduct();
  const [quantity, setQuantity] = useState(0);
  const [isBasketOpen, setIsBasketOpen] = useState(false); 
  const dispatch = useDispatch();

  const availabilityText = selectedProduct.quantityAvailable > 0 ? 'В наявності' : 'Немає в наявності';
  const availabilityStyle = selectedProduct.quantityAvailable > 0 ? { color: 'green' } : { color: 'red' };

  const tabsData = [
    { id: 1, title: 'Доставка', content: 'Опис розділу "Контакти"' },
    { id: 2, title: 'Оплата', content: 'Опис розділу "Оплата"' },
    { id: 3, title: 'Гарантія', content: 'Опис розділу "Гарантія"' },
  ];

  const handleIncrease = () => {
    if (quantity < "100001") {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity < "100001") {
      setQuantity(newQuantity);
    } else if (event.target.value === '') {
      setQuantity(0);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(addToCart(selectedProduct, quantity));
      setIsBasketOpen(true); 
    }
  };

  if (!selectedProduct) {
    return <p>Продукт не найден.</p>;
  }
  
  return (
    <div className="select-product-details">
      <div className="select-product-details-image-block">
        <img className="select-product-details-image" src={selectedProduct.image} alt={selectedProduct.name} />
      </div>
      <div className="select-product-details-info">
        <div className="select-product-details-head">
          <h2>{selectedProduct.name}</h2>
          <p className="select-product-details-head-price">Ціна: {selectedProduct.price}</p>
          <p style={availabilityStyle}>{availabilityText}</p>
          <div className="select-product-details-button-block">
            <button className="select-product-details-combined-button" onClick={handleDecrease}>
              -
            </button>
            <input
              className="select-product-details-quantity"
              type="number"
              min="0"
              max={selectedProduct.quantityAvailable}
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button className="select-product-details-combined-button" onClick={handleIncrease}>
              +
            </button>
            <button className="select-product-details-head-button" onClick={handleAddToCart}>
              До корзини
            </button>
            {isBasketOpen && <Basket onClose={() => setIsBasketOpen(false)} />}
          </div>
        </div>
        <div className="select-product-details-description">
          <h3>Опис</h3>
          <p>{selectedProduct.description}</p>
        </div>
        <div className="select-product-details-delivery">
           <Tabs tabsData={tabsData} className="product-details-tabs"  />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;