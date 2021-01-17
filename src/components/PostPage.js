import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import ReactHtmlParser from 'react-html-parser';

import PostHeader from './PostHeader';

export class PostPage extends React.Component {
  state={
    postTitle: this.props.post ? this.props.post.postTitle : '',
    postBody: this.props.post  ? validator.unescape(this.props.post.postBody) : '',
    authorName: this.props.post  ? this.props.post.authorName : '',
    created: this.props.post  ? this.props.post.created : '',
    postId: this.props.post  ? this.props.post.postId : '',
    authId: this.props.post  ? this.props.post.authId : '',
    isPublished: this.props.post ? this.props.post.isPublished : false
  };
  render() {
    return (
      <React.Fragment>
        { (!!this.state.authId) ? <div>
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
  let post = state.draftList.find((draft) => draft.postId === props.match.params.id);
  if(!post) post = state.postList.find((post) => post.postId === props.match.params.id);
  return{
    post
  }
};

export default connect(mapStateToProps)(PostPage);
