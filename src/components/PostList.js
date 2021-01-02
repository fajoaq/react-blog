import React from 'react';
import { connect } from 'react-redux';

import PostListItem from './PostListItem';

export const PostList = (props) => (
    <div>
        { props.postList &&
            <div className="content-container">
                <div className="list-body">
                {
                    (props.postList.length === 0) ? 
                    <h3>No posts.</h3> 
                    : 
                    props.postList.map((post) => {
                    return <PostListItem 
                                key={ post.id} 
                                post={ post } 
                            />
                    })
                }
                </div>
            </div>
        }
    </div>
    
);

const mapStateToProps = (state) => ({
    postList: state.postList
});

export default connect(mapStateToProps)(PostList);