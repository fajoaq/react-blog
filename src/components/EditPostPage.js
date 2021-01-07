import React from 'react';
import { connect } from 'react-redux';


import { startSetSinglePost, startRemovePost, startUpdatePost } from '../actions/posts';
import { configureModal, toggleModal } from '../actions/modal';
import PostHeader from './PostHeader';
import PostForm from './PostForm';
import Button from './Button';

export class EditPostPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleConfigureModal = this.handleConfigureModal.bind(this);
    this.handleSavepost = this.handleSavepost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.state = {
      postTitle: '',
      postBody: '',
      postAuthor: '',
      created: '',
      id: '',
      postUid: '',
      isPublished: false
    };
  };
  componentDidMount = () => {
    if(!!!this.props.post) {
      this.props.startSetSinglePost(this.props.location.state.uid, this.props.postId).then(() => {
        this.setState((previousState) => ({
          ...previousState,
          ...this.props.post
        }));
      });
    } else {
      this.setState((previousState) => ({
        ...previousState,
        ...this.props.post
      }));   
    }

    this.handleConfigureModal();
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
    const postData = {
      ...this.state,
      isPublished: true
    }
    this.props.startUpdatePost(postData).then(() => {
      this.props.history.push('/');
    });
  };
  handleConfigureModal = () => {
    this.props.configureModal({
      modalTitle: "Remove post?",
      contentLabel: this.props.post.postTitle,
      modalButtons: [
        {
          text: 'Cancel',
          className: 'button',
          onClick: this.props.toggleModal
        },
        {
          text: 'Confirm',
          className: 'button',
          onClick: this.handleDeletePost
        }
      ]
      }
    );
  };
  handleDeletePost = () => {
    this.props.startRemovePost({id: this.state.id, postUid: this.state.postUid }).then(() => {
      this.props.toggleModal();
      this.props.history.push('/');
    });
  };
  render() {
    return (
      
      <div>
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
                <Button onClick={ this.handleSavepost } className="button">
                  Save Post
                </Button>
                <Button onClick={ this.props.toggleModal } className="button">
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
  configureModal: (parameters) => dispatch(configureModal(parameters)),
  toggleModal: () => dispatch(toggleModal()),
  startSetSinglePost: (uid, id) => dispatch(startSetSinglePost(uid, id)),
  startUpdatePost: (post) => dispatch(startUpdatePost(post)),
  startRemovePost: (id, postUid) => dispatch(startRemovePost(id, postUid))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
