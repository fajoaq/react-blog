import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { startSetSingleUser } from '../actions/users';
import { startSetSinglePost, startRemovePost, startUpdatePost } from '../actions/posts';
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
    this.state = {
      postTitle: this.props.post ? this.props.post.postTitle : '',
      postBody: this.props.post  ? validator.unescape(this.props.post.postBody) : '',
      postAuthor: this.props.post  ? this.props.post.postAuthor : '',
      created: this.props.post  ? this.props.post.created : '',
      id: this.props.post  ? this.props.post.id : '',
      postUid: this.props.post  ? this.props.post.postUid : '',
      isPublished: this.props.post ? this.props.post.isPublished : false
    };
  };
  componentDidMount() {
    // When a page is refreshed or when entry is from anywhere other 
    // than dashboard page, fetch data for this single post
    if(!!!this.props.post) {
      this.props.startSetSinglePost(undefined, this.props.postId).then((post) => {
        this.props.startSetSingleUser(post.postUid).then((user) => {
          this.setState((prevState) => ({
            ...prevState,
            ...this.props.post,
            postBody: validator.unescape(this.props.post.postBody),
            postAuthor: user.displayName
          }));
        });
      });
    } 
  };
  handleTitleChange = ({target}) => {
    this.setState(() => ({
      postTitle: target.value.trim()
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
    // Validate, escape, then save data
    if(validator.isAlphanumeric(this.state.postTitle.replace(/ /g,''))) {
      const postData = {
        ...this.state,
        postBody: validator.escape(this.state.postBody),
        isPublished: true
      }
      this.props.configureModal({
        dataHasChanged: false
      });
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
    this.props.configureModal({
      dataHasChanged: false
    });
    
    this.props.startRemovePost({id: this.state.id, postUid: this.state.postUid }).then(() => {
      this.props.toggleModal();
      this.props.history.push('/');
    });
  };
  render() {
    return (
      <React.Fragment>
        { (!!this.state.postUid) ? 
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
  return{
    postId,
    post: state.postList.find((post) => post.id === postId)
  }
};

const mapDispatchToProps = (dispatch) => ({
  configureModal: (parameters) => dispatch(configureModal(parameters)),
  toggleModal: () => dispatch(toggleModal()),
  startSetSingleUser: (uid) => dispatch(startSetSingleUser(uid)),
  startSetSinglePost: (uid, id) => dispatch(startSetSinglePost(uid, id)),
  startUpdatePost: (post) => dispatch(startUpdatePost(post)),
  startRemovePost: (id, postUid) => dispatch(startRemovePost(id, postUid))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
