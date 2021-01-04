import React from 'react';
import { connect } from 'react-redux';

import { startSetSinglePost } from '../actions/posts';
import PageHeader from './PostHeader';

export class PostPage extends React.Component {
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
      <div>
        { (this.props.post) ? <div>
          <PageHeader post={ this.props.post } isAuthor={ false } />
          <div className="content-container">
            { 
              this.props.post &&
              <p>{this.props.post.postBody}</p>
            }
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
