import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import {  startRemovePost, startUpdatePost } from '../actions/posts';
import { configureModal, toggleModal } from '../actions/modal';
import PostHeader from './PostHeader';
import PostForm from './PostForm';
import Button from './Button';

export class EditPostPage extends React.Component {
  constructor(props) {
    super(props)
    this.onInitiateDelete = this.onInitiateDelete.bind(this);
    this.handleSavepost = this.handleSavepost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.props.configureModal();
    this.state = {
      postTitle: this.props.post ? this.props.post.postTitle : '',
      postBody: this.props.post  ? validator.unescape(this.props.post.postBody) : '',
      authorName: this.props.post  ? this.props.post.authorName : 'Anon',
      created: this.props.post  ? this.props.post.created : '',
      postId: this.props.post  ? this.props.post.postId : '',
      authId: this.props.post  ? this.props.post.authId : '',
      isPublished: this.props.post ? this.props.post.isPublished : false
    };
  };
  handleTitleChange = ({target}) => {
    this.setState(() => ({
      postTitle: target.value
    }));
    this.props.configureModal({
      dataHasChanged: true
    });
  };
  handleBodyTextChange = ({target}) => {
    this.setState(() => ({
      postBody: target.value
    }));
    this.props.configureModal({
      dataHasChanged: true
    });
  };
  handleSavepost = () => {
    // trim, validate, escape, then save data
    const postTitle = this.state.postTitle.trim();
    if(validator.isAlphanumeric(this.state.postTitle.replace(/ /g,''))) {
      const postData = {
        ...this.state,
        postTitle,
        postBody: validator.escape(this.state.postBody),
        isPublished: true
      }
      this.props.configureModal();
      this.props.startUpdatePost(postData).then(() => {
        this.props.history.push('/');
      });
    }
  };
  onInitiateDelete = () => {
    this.props.configureModal({
      modalTitle: "Remove post?",
      contentLabel: this.props.post.postTitle,
      modalButtons: [
        {
          text: 'Cancel',
          className: 'button',
          onClick: [this.props.toggleModal]
        },
        {
          text: 'Confirm',
          className: 'button',
          onClick: [this.handleDeletePost]
        }
      ]
      }
    );
    this.props.toggleModal();
  };
  handleDeletePost = () => {   
    this.props.startRemovePost({postId: this.state.postId, authId: this.state.authId }).then(() => {
      this.props.configureModal();
      // configureModal can take in partial arguments
      // side effect - toggle becomes uncontrolled
      // hack
      this.props.configureModal({ initiateModal: true });
      this.props.toggleModal();
      this.props.history.push('/');
    });
  };
  render() {
    return (
      <React.Fragment>
        { (!!this.state.authId) ? 
          <div>
            <PostHeader post={ this.props.post } isAuthor={ true } />
            <div className="content-container">
              <PostForm
                  postTitle={ this.state.postTitle }
                  postBody={ this.state.postBody }
                  handleTitleChange={ this.handleTitleChange }
                  handleBodyTextChange={ this.handleBodyTextChange }
              />
            </div>
            
            <div className="content-container">
              <div className="button-group">
                <Button onClick={ [this.handleSavepost] } className="button">
                  Save Post
                </Button>
                <Button onClick={ [this.onInitiateDelete] } className="button">
                  Delete Post
                </Button>
              </div>
            </div>
          </div>
          :
          <div className="content-container">
            <p className="page-header__error-message">There is no such post.</p>
          </div>
        }
      </React.Fragment>
    );
  };
};

const mapStateToProps = (state, props) => {
  const postId = props.match.params.id
  let post = state.draftList.find((post) => post.postId === postId);

  if(!post) {
    post = state.postList.find((post) => post.postId === postId);
  }
  return{
    post: post,
    postId
  }
};

const mapDispatchToProps = (dispatch) => ({
  configureModal: (parameters) => dispatch(configureModal(parameters)),
  toggleModal: () => dispatch(toggleModal()),
  startUpdatePost: (post) => dispatch(startUpdatePost(post)),
  startRemovePost: (id, authId) => dispatch(startRemovePost(id, authId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
