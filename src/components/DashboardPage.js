import React from 'react';

import PostList from './PostList';
import PostsFilter from './PostsFilter';

export const DashboardPage = () => (
    <React.Fragment>
      <PostsFilter />
      <PostList />
    </React.Fragment>
);

export default DashboardPage;
