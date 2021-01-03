// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});
  
// SORT_BY_DATE
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

 // SORT_BY_AUTHOR
export const sortByAuthor = () => ({
    type: 'SORT_BY_AUTHOR'
});

// SORT_BY_TITLE
export const sortByTitle = () => ({
    type: 'SORT_BY_TITLE'
});

// SET_DATE_FILTER
export const setDateFilter = (dateFilter) => ({
    type: 'SET_DATE_FILTER',
    dateFilter
});