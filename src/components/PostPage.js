import React from 'react';
import { connect } from 'react-redux';

export const PostPage = (props) => (
  <div>
    { (props.post) ? <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">
            Edit Post
            <span className="page-header__author">
              { ` - by ${props.post.postAuthor}` }
            </span>
          </h1>
        </div>
      </div>
      <div className="content-container">
        { 
          props.post &&
          <p>{props.post.postBody}</p>
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

const mapStateToProps = (state, props) => {
  /* console.log(state, props); */
 return {
    post: state.postList.find((post) => post.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(PostPage);
