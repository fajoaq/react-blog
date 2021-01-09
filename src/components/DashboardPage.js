import React from 'react';

import PostList from './PostList';
import FilterPosts from './PostsFilter';

export const DashboardPage = () => (
    <React.Fragment>
      <FilterPosts />
      <PostList />
    </React.Fragment>
);

export default DashboardPage;
