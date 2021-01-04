import React from 'react';
import { connect } from 'react-redux';


import { startSetSinglePost, startRemovePost, startUpdatePost } from '../actions/posts';
import PageHeader from './PostHeader';
import PostModal from './PostModal'
import PostForm from './PostForm';

export class EditPostPage extends React.Component {
  state={
    initiateRemove: false,
    postTitle: '',
    postBody: '',
    postAuthor: '',
    created: '',
    id: '',
    postUid: ''
  };
  componentDidMount = () => {
    if(!!!this.props.post) {
      this.props.startSetSinglePost(this.props.location.state.uid, this.props.postId).then(() => {
        this.setState(() => ({
          ...this.props.post
        }));
      });
    } else {
      this.setState(() => ({
        ...this.props.post
      }));
    }
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
    this.props.startUpdatePost(this.state).then(() => {
      this.props.history.push('/');
    });
  };
  //display modal
  onInitiateRemove = () => {
    this.setState(() => ({ initiateRemove: true }));
  };
  handleDeletePost = () => {
    this.props.startRemovePost({id: this.props.post.id }).then(() => {
      this.props.history.push('/');
    });
  };
  handleClearRemove = () => {
    this.setState(() => ({ initiateRemove: false }));
  };
  render() {
    return (
      <div>
      { (this.props.post) ? <div>
        <PageHeader post={ this.props.post } isAuthor={ true }/>
        <div className="content-container">
          <PostForm
              postTitle={ this.state.postTitle }
              postBody={ this.state.postBody }
              handleTitleChange={ this.handleTitleChange }
              handleBodyTextChange={ this.handleBodyTextChange }
          />
        </div>
        <PostModal
          contentLabel={ this.state.postTitle }
          initiateRemove={ this.state.initiateRemove }
          handleClearRemove={ this.handleClearRemove }
          onRemove={ this.handleDeletePost }
        />
        <div className="button-group">
          <button className="button" onClick={ this.handleSavepost }>Save Post</button>
          <button className="button" onClick={ this.onInitiateRemove }>Delete Post</button>
        </div>
      </div>
      :
      <div className="content-container">
        There is no such post.
      </div>
    }
  </div>
    );
  };
};

const mapStateToProps = (state, props) => {
  const postId = props.match.params.id
  return{
    postId,
    post: state.postList.find((post) => post.id === postId)
  }
};

const mapDispatchToProps = (dispatch) => ({
  startSetSinglePost: (uid, id) => dispatch(startSetSinglePost(uid, id)),
  startUpdatePost: (post) => dispatch(startUpdatePost(post)),
  startRemovePost: (id) => dispatch(startRemovePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
