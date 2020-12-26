import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import AddPost from './AddPost';
import PostList from './PostList';

export class DashboardPage extends React.Component {
  state = {
    postList: []
  };
  onAddPost = () => {
    const newPost = {
      postTitle: 'New Post',
      id: uuidv4()
    };

    this.setState(() => ({
      postList: this.state.postList.concat(newPost)
    }));
  };
  render() {
    return (
      <div>
        <AddPost onAddPost={ this.onAddPost } />
        <PostList postList={ this.state.postList } />
      </div>
    )
  };
};

export default DashboardPage;
