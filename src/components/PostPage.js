import React from 'react';
import { connect } from 'react-redux';

export class PostPage extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            { this.props.post && 
              <h1 className="page-header__title">
                { this.props.post.postTitle}
              </h1>
            }
            <div className="post-item__text">
            </div>
          </div>
        </div>
        <div className="content-container">
          { 
            this.props.post &&
            <p>{this.props.post.postBody}</p>
          }
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({
  post: state.postList.find((post) => post.id === props.match.params.id)
});

export default connect(mapStateToProps)(PostPage);
