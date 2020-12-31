import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startRemovePost, getSinglePost, startUpdatePost } from '../actions/posts';
import PostModal from '../components/PostModal'
import PostForm from '../components/PostForm';

export class EditPostPage extends React.Component {
  state={
      id: '',
      postTitle: '',
      postBody: '',
      postAuthor: '',
      postUid: '',
      initiateRemove: false
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
  //display modal
  onInitiateRemove = () => {
    this.setState(() => ({ initiateRemove: true }));
  };
  handleDeletePost = () => {
    this.props.startRemovePost({id: this.state.id });
    this.props.history.push('/dashboard');
  };
  handleClearRemove = () => {
    this.setState(() => ({ initiateRemove: false }));
  };
  render() {
    return (
        <div>
          <PostModal
            contentLabel={ this.state.postTitle }
            initiateRemove={ this.state.initiateRemove }
            handleClearRemove={ this.handleClearRemove }
            onRemove={ this.handleDeletePost }
          />
          <div className="page-header">
            <div className="content-container">
              <h1 className="page-header__title">Edit Post</h1>
              <div className="post-item__text">
              <Link to={{
                pathname: `/post/${this.state.id}`,
                uid: this.state.postUid
                }} className="post-item__container page-header__message">
                  {"Link readable at: "}<span>{ `https://app.com/post/${this.state.id}`}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="content-container">
            <PostForm 
                postTitle={ this.state.postTitle }
                postBody={ this.state.postBody }
                handleTitleChange={ this.handleTitleChange }
                handleBodyTextChange={ this.handleBodyTextChange }
            />
          </div>
          <div className="button-group">
            <button className="button" onClick={ this.handleSavepost }>save Post</button>
            <button className="button" onClick={ this.onInitiateRemove }>Delete Post</button>
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
