import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import ReactHtmlParser from 'react-html-parser';

import { startSetSinglePost } from '../actions/posts'
import { startSetSingleUser } from '../actions/users';
import PostHeader from './PostHeader';

export class PostPage extends React.Component {
  state={
    postTitle: this.props.post ? this.props.post.postTitle : '',
    postBody: this.props.post  ? validator.unescape(this.props.post.postBody) : '',
    postAuthor: this.props.post  ? this.props.post.postAuthor : '',
    created: this.props.post  ? this.props.post.created : '',
    id: this.props.post  ? this.props.post.id : '',
    postUid: this.props.post  ? this.props.post.postUid : '',
    isPublished: this.props.post ? this.props.post.isPublished : false
  };
  componentDidMount = () => {
    // When a page is refreshed or when entry is from anywhere other 
    // than dashboard page, fetch data for this single post
    if(!!!this.props.post) {
      this.props.startSetSinglePost(undefined, this.props.postId).then((post) => {
        this.props.startSetSingleUser(post.postUid).then((user) => {
          const postBody = validator.unescape(post.postBody);
          this.setState((prevState) => ({
            ...prevState,
            ...this.props.post,
            postBody,
            postAuthor: user.displayName
          }));
        });
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        { (!!this.state.postUid) ? <div>
          <PostHeader post={ this.props.post } isAuthor={ false } />
          <div className="content-container">
            { 
              this.props.post &&
              <div id="post-content">
              { ReactHtmlParser( this.state.postBody) }
              </div>
            }
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
}''

const mapStateToProps = (state, props) => {
  const postId = props.match.params.id;
  return{
    postId,
    post: state.postList.find((post) => post.id === postId)
  }
};
const mapDispatchToProps = (dispatch) => ({
  startSetSingleUser: (uid) => dispatch(startSetSingleUser(uid)),
  startSetSinglePost: (uid, id) => dispatch(startSetSinglePost(uid, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
