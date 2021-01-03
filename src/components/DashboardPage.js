import React from 'react';

import PostList from './PostList';
import FilterPosts from './PostsFilter';

export const DashboardPage = () => (
    <div>
      <FilterPosts />
      <PostList />
    </div>
);

export default DashboardPage;
