import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
  textFilter: '',
  sortBy: 'date',
  dateFilter: 'all',
};

export default (state = filtersReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_STORE_FILTERS':
      return {
        ...action.filters
      }
    default:
      return state;
  };
/*   switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        textFilter: action.textFilter
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SORT_BY_AUTHOR':
      return {
        ...state,
        sortBy: 'author'
      };
    case 'SORT_BY_TITLE':
      return {
        ...state,
        sortBy: 'title'
      };
    case 'SET_DATE_FILTER':
      return {
        ...state,
        dateFilter: action.dateFilter
      };
    default:
      return state;
  } */
};
