import React, {createContext, useState} from 'react';

export const SearchContext = createContext({
  search: '',
  setSearch: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
});

const SearchProvider = ({children}) => {
  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={{search, setSearch}}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
