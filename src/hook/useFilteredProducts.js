// import { useMemo } from 'react';

// const useFilteredProducts = (products, seedFilters) => {
//   const filteredProducts = useMemo(() => {
//     if (!products) {
//       return [];
//     }

//     let sortedAndFilteredProducts = [...products];

//     if (seedFilters.hit) {
//       sortedAndFilteredProducts = sortedAndFilteredProducts.filter(product => product.sold > 9);
//     }
//     if (seedFilters.new) {
//       sortedAndFilteredProducts = sortedAndFilteredProducts.filter(product => product.new);
//     }
//     if (seedFilters.discount) {
//       sortedAndFilteredProducts = sortedAndFilteredProducts.filter(product => product.discount);
//     }
//     if (seedFilters.selectedProducer) {
//       sortedAndFilteredProducts = sortedAndFilteredProducts.filter(product =>
//         product.producer === seedFilters.selectedProducer
//       );
//     }

//     return sortedAndFilteredProducts.filter(product => {
//       if (seedFilters.selectedVegetableTypes.length === 0) {
//         return true;
//       }
//       return seedFilters.selectedVegetableTypes.includes(product.productType);
//     });
//   }, [products, seedFilters]);

//   return filteredProducts;
// };

// export default useFilteredProducts;