
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import {
  removeFromCart,
  updateQuantityInCart,
} from "../../../reducers/basketReducer";
import { useDispatch, useState } from "../../../hook/hooks";
import { useProduct } from "../../../context/contexts";

import "./BasketItem.css";

const BasketItem = ({ item, product, onClose }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const { setSelectedProduct } = useProduct();

  const handleRemoveItem = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= 100001) {
      setQuantity(newQuantity);
      dispatch(updateQuantityInCart(item.product, newQuantity));
    } else if (event.target.value === "") {
      setQuantity("1");
    }
  };

  const formattedTotalPrice = `${(item.product.price * quantity).toLocaleString(
    "en-US"
  )} грн`;

  return (
    <div className="basket-item-pay-info">
      <Link
        className="basket-item-pay-link"
        to={`/product/${item.product.id}`}
        onClick={() => {
          setSelectedProduct(item.product);
        }}
      >
        <img
          onClick={onClose}
          className="basket-item-pay-info-image"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="basket-item-pay-info-name">{product.name}</div>
      <div className="basket-item-pay-info-quantity">
        <p className="basket-item-quantity">Кількість:</p>
        <input
          className="basket-item-pay-info-quantity-input"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="0"
        />
      </div>
      <div className="basket-item-pay-info-price">
        <p> Ціна: {formattedTotalPrice}</p>
      </div>
      <Icon
        icon="material-symbols:delete-outline"
        className="icon"
        onClick={() => handleRemoveItem(item.product)}
      />
    </div>
  );
};

export default BasketItem;
