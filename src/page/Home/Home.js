import ProductList from "../../components/ProductList/ProductList";

import "./Home.css";

function Home() {
  return (
    <div className="main">
      <div className="main-image">
        <h2 className="main-slogan">
          Найкращі насіння для найкращих господарів
        </h2>
      </div>
      <div className="product-container">
        <ProductList />
      </div>
    </div>
  );
}

export default Home;
