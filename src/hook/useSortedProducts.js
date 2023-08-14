// import { useMemo } from 'react';

// const useSortedProducts = (products, sortBy) => {
//   const sortedProducts = useMemo(() => {
//     if (!products) {
//       return [];
//     }

//     const clonedProducts = [...products];

//     if (sortBy === 'cheap') {
//       clonedProducts.sort((a, b) => a.price - b.price);
//     } else if (sortBy === 'expensive') {
//       clonedProducts.sort((a, b) => b.price - a.price);
//     } else if (sortBy === 'popular') {
//       clonedProducts.sort((a, b) => b.sold - a.sold);
//     } else if (sortBy === 'name') {
//       clonedProducts.sort((a, b) => a.name.localeCompare(b.name));
//     }

//     return clonedProducts;
//   }, [products, sortBy]);

//   return sortedProducts;
// };

// export default useSortedProducts;