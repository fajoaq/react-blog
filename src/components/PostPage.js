import React from 'react';
import { connect } from 'react-redux';
import { startRemovePost } from '../actions/posts';

export class PostPage extends React.Component {
 
  render() {
    return (
      <div>
        <div>This is a post</div>
          <div>
            {
              this.props.post.postTitle
            }
          </div>
          <div>
          {
            this.props.post.id
          }
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({
  post: state.postList.find((post) => post.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startRemovePost: (id) => dispatch(startRemovePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
