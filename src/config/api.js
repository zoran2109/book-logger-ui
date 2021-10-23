const openLibraryEndpoint = 'https://openlibrary.org/search.json';

/** Fetches data from open library
 * @param {string} searchType author, all(q) or titles
 * @param {string} searchQuery Text that the user provided for search
 * @param {number} page Optional - specifies which page of data to fetch, if not provided feches all
 */
export const openLibrarySearchUrl = (searchType, searchQuery, page) =>
  page === undefined
    ? `${openLibraryEndpoint}?${searchType}=${searchQuery}`
    : `${openLibraryEndpoint}?${searchType}=${searchQuery}&page=${page}`;
