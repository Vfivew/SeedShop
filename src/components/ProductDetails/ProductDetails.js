import { useProduct } from "../../context/contexts";
import { addToCart } from "../../reducers/basketReducer";
import { openBasket, closeBasket } from "../../reducers/basketReducer";
import { useState, useDispatch, useSelector } from "../../hook/hooks";
import Tabs from "../Tabs/Tabs";
import Basket from "../Basket/Basket";

import "./ProductDetails.css";

function ProductDetails() {
  const dispatch = useDispatch();
  const { selectedProduct } = useProduct();
  const [quantity, setQuantity] = useState(0);
  const isBasketOpen = useSelector((state) => state.basket.isBasketOpen);

  const availabilityText =
    selectedProduct.quantityAvailable > 0 ? "В наявності" : "Немає в наявності";
  const availabilityStyle =
    selectedProduct.quantityAvailable > 0
      ? { color: "green" }
      : { color: "red" };

  const tabsData = [
    { id: 1, title: "Доставка", content: 'Опис розділу "Контакти"' },
    { id: 2, title: "Оплата", content: 'Опис розділу "Оплата"' },
    { id: 3, title: "Гарантія", content: 'Опис розділу "Гарантія"' },
  ];

  const handleIncrease = () => {
    if (quantity < 100001) {
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
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity < 100001) {
      setQuantity(newQuantity);
    } else if (event.target.value === "") {
      setQuantity(0);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(addToCart(selectedProduct, quantity));
      dispatch(openBasket());
    }
  };

  if (!selectedProduct) {
    return <p>Продукт не знайдено.</p>;
  }

  return (
    <div className="select-product-details">
      <div className="select-product-details-image-block">
        <img
          className="select-product-details-image"
          src={selectedProduct.image}
          alt={selectedProduct.name}
        />
      </div>
      <div className="select-product-details-info">
        <div className="select-product-details-head">
          <h2>{selectedProduct.name}</h2>
          <p className="select-product-details-head-price">
            Ціна: {selectedProduct.price}
          </p>
          <p className="product-availability" style={availabilityStyle}>
            {availabilityText}
          </p>
          <div className="select-product-details-button-block">
            <button
              className="select-product-details-combined-button"
              onClick={handleDecrease}
            >
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
            <button
              className="select-product-details-combined-button"
              onClick={handleIncrease}
            >
              +
            </button>
            <button
              className="select-product-details-head-button"
              onClick={handleAddToCart}
              disabled={selectedProduct.quantityAvailable <= 0}
              style={
                selectedProduct.quantityAvailable <= 0
                  ? {
                      backgroundColor: "lightgray",
                      color: "gray",
                      cursor: "not-allowed",
                    }
                  : {}
              }
            >
              До корзини
            </button>
            {isBasketOpen && <Basket onClose={() => dispatch(closeBasket())} />}
          </div>
        </div>
        <div className="select-product-details-description">
          <h3>Опис</h3>
          <p>{selectedProduct.description}</p>
        </div>
        <div className="select-product-details-delivery">
          <Tabs tabsData={tabsData} className="product-details-tabs" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
