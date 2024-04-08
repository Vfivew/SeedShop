import { Link } from "react-router-dom";

import { setSortBy } from "../../reducers/productsReducer";
import { useDispatch, useSelector } from "../../hook/hooks";
import { useProduct } from "../../context/contexts";
import ProductCard from "../Cards/ProductCards";

import "./ProductList.css";

function ProductList() {
  const dispatch = useDispatch();
  const { products } = useProduct();
  const sortBy = useSelector((state) => state.products.sortBy);
  const activeButton = useSelector((state) => state.products.activeButton);

  const { setSelectedProduct } = useProduct();

  const handleButtonClick = (value) => {
    dispatch(setSortBy(value));
  };

  let sortedAndFilteredProducts = [...products];
  if (sortBy === "sold") {
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
      (product) => product.sold > 9
    );
    sortedAndFilteredProducts.sort((a, b) => b.sold - a.sold);
  } else if (sortBy === "discount") {
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
      (product) => product.discount
    );
    sortedAndFilteredProducts.sort((a, b) => b.discount - a.discount);
  } else if (sortBy === "new") {
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
      (product) => product.new
    );
  }

  return (
    <div className="main-product">
      <div className="sort-buttons">
        <button
          className={activeButton === "sold" && "active"}
          onClick={() => handleButtonClick("sold")}
        >
          Хіт продаж
        </button>
        <button
          className={activeButton === "new" && "active"}
          onClick={() => handleButtonClick("new")}
        >
          Новинки
        </button>
        <button
          className={activeButton === "discount" && "active"}
          onClick={() => handleButtonClick("discount")}
        >
          Знижки
        </button>
      </div>
      <div className="product-list">
        {sortedAndFilteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            onClick={() => setSelectedProduct(product)}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
