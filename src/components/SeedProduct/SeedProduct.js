import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../Cards/ProductCards';
import Filters from '../Filters/Filters';
import Sort from '../Sort/Sort';
import { setSeedSort, resetSeedFilters } from '../../reducers/SeedProductReducer';
import { useProduct } from '../../context/contexts';
import Spinner from '../Spinner/Spinner';
import Pagination from '../../utils/Pagination/Pagination';

import './SeedProduct.css';

function SeedProduct({ productTypeFilter }) {
  const dispatch = useDispatch();
  const { products, loading, setSelectedProduct } = useProduct();
  const seedFilters = useSelector(state => state.seedProduct.filters);
  const activeSort = useSelector(state => state.seedProduct.sortBy);

  const [currentFilters, setCurrentFilters] = useState(seedFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleSortClick = (sortMethod) => dispatch(setSeedSort(sortMethod));

  const uniqueProducers = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.filter(product => product.type === productTypeFilter).map(product => product.producer))];
  }, [products, productTypeFilter]);

  const uniqueProductTypes = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.filter(product => product.type === productTypeFilter).map(product => product.productType))];
  }, [products, productTypeFilter]);

  const calculateIndexes = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

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

  const { startIndex, endIndex } = calculateIndexes();
  const productsToShow = sortedProducts.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(resetSeedFilters());
  }, [dispatch, productTypeFilter]);

  useEffect(() => {
    setCurrentFilters(seedFilters);
  }, [seedFilters]);

  if (loading) {
    return <Spinner />;
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
          {productsToShow.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={() => setSelectedProduct(product)}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedProducts.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default SeedProduct;
