import { useNavigate, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

import { useSelector, useDispatch, useState } from "../../hook/hooks";
import { setSeedFilters } from "../../reducers/seedProductReducer";
import { useProduct } from "../../context/contexts";
import { openBasket, closeBasket } from "../../reducers/basketReducer";
import Basket from "../Basket/Basket";
import Logo from "../../resources/image/Logo.png";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { products } = useProduct();

  const dispatch = useDispatch();
  const seedFilters = useSelector((state) => state.seedProduct.filters);
  const cartItems = useSelector((state) => state.basket.cartItems);
  const isBasketOpen = useSelector((state) => state.basket.isBasketOpen);

  const uniqueProductIds = new Set(cartItems.map((item) => item.product.id));
  const uniqueProductCount = uniqueProductIds.size;

  const toggleBasket = () => {
    if (isBasketOpen) {
      dispatch(closeBasket());
    } else {
      dispatch(openBasket());
    }
  };

  const handleSearch = () => {
    const lowercaseSearchText = searchText.toLowerCase();

    const foundProductType = products.find(
      (product) =>
        product.productType.toLowerCase().includes(lowercaseSearchText) &&
        lowercaseSearchText.length >= 2
    );

    if (foundProductType) {
      if (foundProductType.type === "Овочі") {
        dispatch(
          setSeedFilters({
            ...seedFilters,
            selectedProductTypes: [foundProductType.productType],
          })
        );
        navigate("/seedvegetable", {
          state: { productType: foundProductType.productType },
        });
      } else if (foundProductType.type === "Ягоди") {
        dispatch(
          setSeedFilters({
            ...seedFilters,
            selectedProductTypes: [foundProductType.productType],
          })
        );
        navigate("/seedberries", {
          state: { productType: foundProductType.productType },
        });
      }
    } else {
      dispatch(setSeedFilters({ ...seedFilters, selectedProductTypes: [] }));
    }
  };

  return (
    <header className="header-block">
      <div className="logo-block">
        <NavLink to="/">
          <img className="image-logo" alt="Logo" src={Logo}></img>
        </NavLink>
      </div>
      <div className="info-block">
        <Icon className="phone-icon" icon="ph:phone" color="green" />
        <a className="phone-number" href="tel:380999999999">
          +099-999-99-99
        </a>
        <Icon className="working-hours-icon" icon="typcn:time" color="green" />
        <ul className="working-hours">
          <li>Робочі дні: 09:00 - 18:00</li>
          <li>Вихідні дні: 10:00 - 15:00</li>
        </ul>
      </div>
      <div className="search-block">
        <div className="search-input">
          <input
            type="text"
            placeholder="Введіть назву товару"
            value={searchText}
            className="search-input-insert"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="search-icon" onClick={handleSearch}>
            <Icon
              className="search-input-insert-icon"
              icon="bi:search"
              color="green"
              width="10"
              height="10"
            />
          </div>
        </div>
      </div>
      <div className="basket-block">
        <div className="basket-icon-wrapper" onClick={toggleBasket}>
          <Icon
            className="basket-block-icon"
            icon="fluent-emoji-high-contrast:basket"
            width="40"
            height="40"
          />
          {uniqueProductCount > 0 && (
            <div className="basket-item-count">{uniqueProductCount}</div>
          )}
        </div>
        {isBasketOpen && <Basket onClose={toggleBasket} />}
      </div>
    </header>
  );
};

export default Header;
