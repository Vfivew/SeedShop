import React, { useEffect, useMemo, useState } from 'react';
import useFetchData from '../../hook/useFetchData';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../Cards/ProductCards';
import Filters from '../Filters/Filters';
import Sort from '../Sort/Sort';
import { setSeedSort, resetSeedFilters  } from '../../reducers/SeedProductReducer';
import './SeedProduct.css';
import { useProduct } from '../../context/contexts';

function SeedProduct({ productTypeFilter }) {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useFetchData('https://raw.githubusercontent.com/Vfivew/DataSeedShop/main/data.json');
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

  // const logger = () => {
  //   sortedProducts.map(product => console.log(product.id))
  // }
  // logger()

  useEffect(() => {
    setCurrentFilters(seedFilters);
  }, [seedFilters]);

    useEffect(() => {
    dispatch(resetSeedFilters());
  }, [dispatch, productTypeFilter]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!products) {
    return <p>No data available.</p>;
  }

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