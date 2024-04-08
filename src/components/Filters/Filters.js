import { useState } from "../../hook/hooks";
import {
  setSeedFilters,
  resetSeedFilters,
  toggleFilterHit,
  toggleFilterNew,
  toggleFilterDiscount,
  setSeedProducerFilter,
} from "../../reducers/SeedProductReducer";

import "./Filters.css";

const Filters = ({
  seedFilters,
  dispatch,
  uniqueProducers,
  uniqueProductTypes,
  activeFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleProductTypeToggle = (productType) => {
    const updatedselectedProductTypes =
      seedFilters.selectedProductTypes.includes(productType)
        ? seedFilters.selectedProductTypes.filter((v) => v !== productType)
        : [...seedFilters.selectedProductTypes, productType];

    dispatch(
      setSeedFilters({
        ...seedFilters,
        selectedProductTypes: updatedselectedProductTypes,
      })
    );
  };

  const resetFilters = () => {
    dispatch(resetSeedFilters());
  };

  return (
    <div>
      <button
        className={`vertical-button ${!showFilters ? "" : "hidden"}`}
        onClick={() => setShowFilters(!showFilters)}
      >
        Фільтри
      </button>
      <div className={`filters ${showFilters && "show"}`}>
        <h3 className="filters-title">Насіння овочів</h3>
        <div className="seed-list-filter">
          <label className={`filter ${seedFilters.hit && "active"}`}>
            <input
              className="seed-list-filter-cheakbox"
              type="checkbox"
              checked={seedFilters.hit}
              onChange={() => dispatch(toggleFilterHit())}
            />
            <span className="custom-checkbox"></span>
            Хіт
          </label>
          <label className={`filter ${seedFilters.new && "active"}`}>
            <input
              className="seed-list-filter-cheakbox"
              type="checkbox"
              checked={seedFilters.new}
              onChange={() => dispatch(toggleFilterNew())}
            />
            <span className="custom-checkbox"></span>
            Новинка
          </label>
          <label className={`filter ${seedFilters.discount && "active"}`}>
            <input
              className="seed-list-filter-cheakbox"
              type="checkbox"
              checked={seedFilters.discount}
              onChange={() => dispatch(toggleFilterDiscount())}
            />
            <span className="custom-checkbox"></span>
            Знижка
          </label>
        </div>
        <h3 className="filters-title">Вид культури</h3>
        <div className="seed-list-filter">
          {uniqueProductTypes.map((productType, index) => (
            <label className="seed-list-filter-item filter" key={index}>
              <input
                type="checkbox"
                className="seed-list-filter-cheakbox"
                checked={seedFilters.selectedProductTypes.includes(productType)}
                onChange={() => handleProductTypeToggle(productType)}
              />
              <span className="custom-checkbox"></span>
              {productType}
            </label>
          ))}
        </div>

        <h3 className="filters-title">Виробник</h3>
        <select
          className="select-filter"
          onChange={(e) => dispatch(setSeedProducerFilter(e.target.value))}
        >
          <option value="">Оберіть виробника</option>
          {uniqueProducers.map((producer, index) => (
            <option key={index} value={producer}>
              {producer}
            </option>
          ))}
        </select>

        <button
          className={`filters-button ${!activeFilters && "hidden"}`}
          onClick={resetFilters}
        >
          Очистити фільтри
        </button>
        <button
          className="filters-button toggle-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          Назад
        </button>
      </div>
    </div>
  );
};

export default Filters;
