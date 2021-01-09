import React from 'react';
import { connect } from 'react-redux';

import { startSetSinglePost } from '../actions/posts';
import PostHeader from './PostHeader';

export class PostPage extends React.Component {
  state={
    initiateRemove: false,
    postTitle: '',
    postBody: '',
    postAuthor: '',
    created: '',
    id: '',
    postUid: '',
    isPublished: false
  };
  componentDidMount = () => {
    if(!!!this.props.post) {
      this.props.startSetSinglePost(undefined, this.props.postId).then(() => {
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
  render() {
    return (
      <React.Fragment>
        { (!!this.state.postUid) ? <div>
          <PostHeader post={ this.props.post } isAuthor={ false } />
          <div className="content-container">
            { 
              this.props.post &&
              <p>{this.props.post.postBody}</p>
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
  const postId = props.match.params.id
  return{
    postId,
    post: state.postList.find((post) => post.id === postId)
  }
};
const mapDispatchToProps = (dispatch) => ({
  startSetSinglePost: (uid, id) => dispatch(startSetSinglePost(uid, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
