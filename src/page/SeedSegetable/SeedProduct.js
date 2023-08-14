import React, { useMemo } from 'react';
import useFetchData from '../../hook/useFetchData';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/Cards/ProductCards';
import Filters from '../../components/Filters/Filters';
import Sort from '../../components/Sort/Sort';
import { setSeedSort } from '../../reducers/SeedProductReducer';
import './SeedProduct.css';

function SeedSegetable() {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useFetchData('https://raw.githubusercontent.com/Vfivew/DataSeedShop/main/data.json');
  const seedFilters = useSelector(state => state.seedVegetable.filters);
  const activeSort = useSelector(state => state.seedVegetable.sortBy);

  const uniqueProducers = useMemo(() => {
    if (!products) {
      return [];
    }
    return [...new Set(products.filter(product => product.type === "Овочі").map(product => product.producer))];
  }, [products]);

  const uniqueVegetableTypes = useMemo(() => {
    if (!products) {
      return [];
    }
    return [...new Set(products.filter(product => product.type === "Овочі").map(product => product.productType))];
  }, [products]);

  const handleSortClick = (sortMethod) => {
    dispatch(setSeedSort(sortMethod));
  };

  const sortedAndFilteredProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    let sortedAndFiltered = [...products];

    if (seedFilters.hit) {
      sortedAndFiltered = sortedAndFiltered.filter(product => product.sold > 9);
    }
    if (seedFilters.new) {
      sortedAndFiltered = sortedAndFiltered.filter(product => product.new);
    }
    if (seedFilters.discount) {
      sortedAndFiltered = sortedAndFiltered.filter(product => product.discount);
    }
    if (seedFilters.selectedProducer) {
      sortedAndFiltered = sortedAndFiltered.filter(product =>
        product.producer === seedFilters.selectedProducer
      );
    }

    return sortedAndFiltered.filter(product => {
      if (seedFilters.selectedProductTypes.length === 0) {
        return true;
      }
      return seedFilters.selectedProductTypes.includes(product.productType);
    });
  }, [products, seedFilters]);

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
    <div className='vegetable-product'>
      <Filters
        seedFilters={seedFilters}
        dispatch={dispatch}
        products={products}
        uniqueProducers={uniqueProducers}
        uniqueVegetableTypes={uniqueVegetableTypes}
      />
      <div className="product-block">
        <Sort
          activeSort={activeSort}
          handleSortClick={handleSortClick}
          sortedAndFilteredProducts={sortedAndFilteredProducts}
        />
        <div className='vegetable-list'>
          {sortedAndFilteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeedSegetable;