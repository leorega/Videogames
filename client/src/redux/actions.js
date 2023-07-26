export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';
export const SORT_BY_ALPHABETICAL = 'SORT_BY_ALPHABETICAL';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const RESET = 'RESET';

export const filterByGenre = (genre) => ({
    type: FILTER_BY_GENRE,
    payload: genre,
  });
  
  export const filterBySource = (source) => ({
    type: FILTER_BY_SOURCE,
    payload: source,
  });
  
  export const sortByAlphabetical = (order) => ({
    type: SORT_BY_ALPHABETICAL,
    payload: order,
  });
  
  export const sortByRating = (order) => ({
    type: SORT_BY_RATING,
    payload: order,
  });

  export const reset = () => ({
    type: RESET
  });
  