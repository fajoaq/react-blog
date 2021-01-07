import React from 'react';
import { connect } from 'react-redux';

import PostListItem from './PostListItem';

export const PostList = (props) => (
    <div>
        { props.visiblePosts &&
            <div className="content-container">
                <div className="list-body">
                {
                    (props.visiblePosts.length === 0) ? 
                    <h3 className="list-item list-error-visible">No posts.</h3> 
                    : 
                    props.visiblePosts.map((post) => {
                    if(post) {
                        return <PostListItem  key={ post.id} post={ post } />
                        }
                    })
                }
                </div>
            </div>
        }
    </div>
    
);

const mapStateToProps = (state) => ({
    visiblePosts: state.postList.map((post) => {
        if(post.id && post.isPublished === true) return post
    })
});

export default connect(mapStateToProps)(PostList);