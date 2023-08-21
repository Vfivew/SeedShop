import React, { createContext, useContext, useState } from 'react';

const ResetFiltersContext = createContext();

export function ResetFiltersProvider({ children }) {
  const [shouldResetFilters, setShouldResetFilters] = useState(true);

  return (
    <ResetFiltersContext.Provider value={{ shouldResetFilters, setShouldResetFilters }}>
      {children}
    </ResetFiltersContext.Provider>
  );
}

export function useResetFilters() {
  return useContext(ResetFiltersContext);
}