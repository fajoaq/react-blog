import React from 'react';
import { connect } from 'react-redux';

import AddPost from './AddPost';
import PostList from './PostList';

export const PostPage = (props) => (
    <div>
      <div>This is a post</div>
        <div>
          {
            props.post.postTitle
          }
        </div>
    </div>
);

const mapStateToProps = (state, props) => ({
  post: state.postList.find((post) => post.id === props.match.params.id)
});

export default connect(mapStateToProps)(PostPage);
