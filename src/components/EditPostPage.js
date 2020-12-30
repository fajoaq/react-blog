import React from 'react';
import { connect } from 'react-redux';
import { startRemovePost, getSinglePost, startUpdatePost } from '../actions/posts';

export class EditPostPage extends React.Component {
  state={
      id: '',
      postTitle: '',
      postBody: ''
    };

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.getSinglePost({id}).then((data) => {
      this.setState(() => ({
        ...data
      }));
    });
  };
  handleTitleChange = ({target}) => {
    this.setState(() => ({
      postTitle: target.value
    }));
  };
  handleBodyTextChange = ({target}) => {
    this.setState(() => ({
      postBody: target.value
    }));
  };
  handleSavepost = () => {
    this.props.startUpdatePost(this.state);
    this.props.history.push('/dashboard');
  };
  handleDeletePost = () => {
    this.props.startRemovePost({id: this.state.id });
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <form>
          <input type="text" name="postTitle" onChange={ this.handleTitleChange } value={ this.state.postTitle } />
          <textarea name="postTitle" onChange={ this.handleBodyTextChange } value={ this.state.postBody } />
        </form>
        <div>
        <button onClick={ this.handleSavepost }>save Post</button>
        </div>
        <div>
          <button onClick={ this.handleDeletePost }>Delete Post</button>
        </div>
      </div>
    );
  };
};

/* const mapStateToProps = (state, props) => ({
  post: state.postList.find((post) => post.id === props.match.params.id)
}); */

const mapDispatchToProps = (dispatch) => ({
  getSinglePost: (id) => dispatch(getSinglePost(id)),
  startUpdatePost: (post) => dispatch(startUpdatePost(post)),
  startRemovePost: (id) => dispatch(startRemovePost(id))
});

export default connect(undefined, mapDispatchToProps)(EditPostPage);
