import React from 'react';
import { connect } from 'react-redux';
import { startRemovePost } from '../actions/posts';
import { history } from '../routers/AppRouter';

export class EditPostPage extends React.Component {
  handleDeletePost = () => {
    console.log(this.props.post);
    this.props.startRemovePost({id: this.props.post.id });
    this.props.history.push('/dashboard');
  };
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
        <div>
          <button onClick={ this.handleDeletePost }>Delete Post</button>
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
