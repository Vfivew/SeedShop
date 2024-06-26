import "./ProductCards.css";

function ProductCard({ product }) {
  const availabilityText =
    product.quantityAvailable > 0 ? "В наявності" : "Немає в наявності";
  const availabilityStyle =
    product.quantityAvailable > 0 ? { color: "green" } : { color: "red" };
  const isBestSeller = product.sold > 9;
  const isNew = product.new === true;
  const isDiscount = product.discount === true;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className={`sticker ${isBestSeller ? "best-seller" : ""}`}>
          {isBestSeller && "Хіт продаж"}
        </div>
        <div
          className={`sticker ${isNew ? "new" : ""} `}
          style={{
            top: isBestSeller ? "calc(85% + 0.85em)" : "calc(85% + 2.68em)",
          }}
        >
          {isNew && "Новинка"}
        </div>
        <div
          className={`sticker ${isDiscount ? "discount" : ""}  `}
          style={{
            top:
              isBestSeller && isNew
                ? "calc(85% - 1.15em)"
                : isBestSeller
                ? "calc(85% + 0.8em)"
                : "calc(85% + 2.7em)",
          }}
        >
          {isDiscount && "Знижка"}
        </div>
      </div>
      <div className="product-details">
        <h4>{product.name}</h4>
        <p className="price">Ціна: {product.price} грн</p>
        <p className="product-availability" style={availabilityStyle}>
          {availabilityText}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
