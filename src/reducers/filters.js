// Filters Reducer

const filtersReducerDefaultState = {
  textFilter: '',
  sortBy: 'date',
  dateFilter: 'all',
  hasFilters: false
};

export default (state = filtersReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_STORE_FILTERS':
      return {
        ...state,
        ...action.filters
      }
    default:
      return state;
  };
};
