import moment from 'moment';

// Get visible posts / drafts

export default (posts, { textFilter, sortBy, dateFilter }) => {
  let dateFilterValue = 0;
  switch(dateFilter) {
    case 'month':
      dateFilterValue = moment().subtract(1, 'months').valueOf();
      break;
    case '6-month':
      dateFilterValue = moment().subtract(6, 'months').valueOf();
      break;
    case '1-year':
      dateFilterValue = moment().subtract(1, 'year').valueOf();
      break;
    default:
      dateFilterValue = 0;
      break;
  }
  
  return posts.filter((post) => {
    const createdAtMoment = moment(post.created).valueOf();
    const dateFilterMatch = dateFilterValue ? (dateFilterValue <= createdAtMoment) : true;
    const textMatch = !!textFilter ? post.postTitle.toLowerCase().includes(textFilter.toLowerCase()) : true;

    return dateFilterMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.created < b.created ? 1 : -1;
    } else if (sortBy === 'author') {
      return a.postAuthor > b.postAuthor ? 1 : -1;
    }
    else if (sortBy === 'title') {
      return a.postTitle > b.postTitle ? 1 : -1;
    }
  });
};
