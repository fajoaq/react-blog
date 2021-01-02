import React from 'react';
import { connect } from 'react-redux';

import PageHeader from '../components/PageHeader';

export const PostPage = (props) => (
  <div>
    { (props.post) ? <div>
      <PageHeader post={ props.post } isAuthor={ false } />
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
  const post = state.postList.find((post) => post.id === props.match.params.id);

 return { post };
};

export default connect(mapStateToProps)(PostPage);
