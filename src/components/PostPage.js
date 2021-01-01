import React from 'react';
import { connect } from 'react-redux';

export const PostPage = (props) => (
  <div>
    <div className="page-header">
      <div className="content-container">
        { props.post && 
          <h1 className="page-header__title">
            { props.post.postTitle}
          </h1>
        }
        <div className="post-item__text">
        </div>
      </div>
    </div>
    <div className="content-container">
      { 
        props.post &&
        <p>{props.post.postBody}</p>
      }
    </div>
  </div>
);

const mapStateToProps = (state, props) => {
  /* console.log(state, props); */
 return {
    post: state.postList.find((post) => post.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(PostPage);
