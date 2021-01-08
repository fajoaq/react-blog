import React from 'react';
import { connect } from 'react-redux';

import PostListItem from './PostListItem';

export const PostList = (props) => (
    <div>
        <React.Fragment>
        { (props.draftPosts.length > 0) &&
            <div className="content-container">
                <div className="list-body">
                {
                    props.draftPosts.map((post) => {
                        if(post) {
                            return <PostListItem  key={ post.id} post={ post } />
                            }
                        })
                }
                </div>
            </div>
        }
        { (props.visiblePosts.length > 0) ?
            <div className="content-container">
                <div className="list-body">
                {
                    props.visiblePosts.map((post) => {
                        if(post) {
                            return <PostListItem  key={ post.id} post={ post } />
                            }
                        })
                }
                </div>
            </div>
            :
            <h3 className="list-item list-error-visible">No posts.</h3> 
        }
        </React.Fragment>
        
    </div>
    
);

const mapStateToProps = (state) => {
    let draftPosts = [];
    return {
        visiblePosts: state.postList.map((post) => {
            if(post.id && post.isPublished === true) {
                return post;
            } else if(post.id && post.isPublished === false) {
                draftPosts.push(post)
                return;
            }
        }),
        draftPosts
    };
};

export default connect(mapStateToProps)(PostList);