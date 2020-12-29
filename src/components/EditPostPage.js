import React from 'react';
import { connect } from 'react-redux';
import { startRemovePost } from '../actions/posts';

export class EditPostPage extends React.Component {
  render() {
    return (
      <div>
        <div>This is an editable post.</div>
          <div>
            {
              (this.props.post) && <h3>{ this.props.post.postTitle }</h3>
            }
          </div>
          <div>
          {
            (this.props.post) && <h3>{ this.props.post.id }</h3>
          }
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({
  post: state.postList.find((post) => post.id === props.location.state.postId)
});

const mapDispatchToProps = (dispatch) => ({
  startRemovePost: (id) => dispatch(startRemovePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
