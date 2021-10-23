import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

/** Context that stores search results and information needed to search for and display book data */
export const SearchContext = createContext();

const initialState = {
  searchResults: [],
  resultsNumber: undefined,
  fetchedPage: 1,
  queryText: '',
  searchType: 'q',
  pageNumber: 1,
  isLoading: false,
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'searchResults': {
      const data =
        state.searchResults.length === 0
          ? action.data
          : [...state.searchResults, ...action.data];
      return { ...state, searchResults: data };
    }
    case 'resultsNumber':
      return { ...state, resultsNumber: action.data };
    case 'fetchedPage':
      return { ...state, fetchedPage: action.data };
    case 'queryText':
      return { ...state, queryText: action.data };
    case 'searchType':
      return { ...state, searchType: action.data };
    case 'pageNumber':
      return { ...state, pageNumber: action.data };
    case 'isLoading':
      return { ...state, isLoading: true };
    case 'notLoading':
      return { ...state, isLoading: false };
    case 'reset':
      return {
        ...initialState,
        searchType: state.searchType,
        queryText: state.queryText,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

/** Provides search results and information used to search for and display book data
 * @param {children} node components that will be wrapped by search context provider
 */
export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchContextProvider.propTypes = {
  children: PropTypes.node,
};
