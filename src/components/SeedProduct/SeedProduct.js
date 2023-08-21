import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../Cards/ProductCards';
import Filters from '../Filters/Filters';
import Sort from '../Sort/Sort';
import { setSeedSort, resetSeedFilters } from '../../reducers/SeedProductReducer';
import './SeedProduct.css';
import { useProduct } from '../../context/contexts';

function SeedProduct({ productTypeFilter }) {
  const dispatch = useDispatch();
  const { products } = useProduct();
  const seedFilters = useSelector(state => state.seedProduct.filters);
  const activeSort = useSelector(state => state.seedProduct.sortBy);
  const { setSelectedProduct } = useProduct();

  const handleSortClick = (sortMethod) => dispatch(setSeedSort(sortMethod));

  const uniqueProducers = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.filter(product => product.type === productTypeFilter).map(product => product.producer))];
  }, [products, productTypeFilter]);

  const uniqueProductTypes = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.filter(product => product.type === productTypeFilter).map(product => product.productType))];
  }, [products, productTypeFilter]);

  const [currentFilters, setCurrentFilters] = useState(seedFilters);

  const sortedProducts = useMemo(() => {
    if (!products) return [];
    const filteredProducts = products.filter(product => {
      if (productTypeFilter === "Овочі" && product.type !== "Овочі") return false;
      if (productTypeFilter === "Ягоди" && product.type !== "Ягоди") return false;
      if (currentFilters.hit && product.sold <= 9) return false;
      if (currentFilters.new && !product.new) return false;
      if (currentFilters.discount && !product.discount) return false;
      if (currentFilters.selectedProducer && product.producer !== currentFilters.selectedProducer) return false;
      if (currentFilters.selectedProductTypes.length > 0 && !currentFilters.selectedProductTypes.includes(product.productType)) return false;
      return true;
    });

    return filteredProducts.filter(product => currentFilters.selectedProductTypes.length === 0 || currentFilters.selectedProductTypes.includes(product.productType));
  }, [products, currentFilters, productTypeFilter]);

  useEffect(() => {
    console.log("reset")
    dispatch(resetSeedFilters());
  }, [dispatch, productTypeFilter]);// тут проблема з пошуком
  
  
  useEffect(() => {
    console.log(seedFilters)
    setCurrentFilters(seedFilters);
  }, [seedFilters]);


  // if (!products) {
  //   return <p>No data available.</p>;
  // }

  return (
    <div className='seed-product'>
      <Filters
        seedFilters={currentFilters}
        dispatch={dispatch}
        products={products}
        uniqueProducers={uniqueProducers}
        uniqueProductTypes={uniqueProductTypes}
      />
      <div className="product-block">
        <Sort
          activeSort={activeSort}
          handleSortClick={handleSortClick}
          sortedProducts={sortedProducts}
        />
        <div className='seed-list'>
          {sortedProducts.map(product => (
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
    </div>
  );
}

export default SeedProduct;


/* const didMountRef = useRef(false);

  useEffect(() => {
    // Пропустить первый рендер, не сбрасывать фильтры
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    
    dispatch(resetSeedFilters());
  }, [dispatch, productTypeFilter]);*/