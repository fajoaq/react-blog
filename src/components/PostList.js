import React from 'react';
import { connect } from 'react-redux';
import { setStoreFilters } from '../actions/filters';

import PostListItem from './PostListItem';
import Button from './Button';

export class PostList extends React.Component {
    state = {
        showDraftList: false
    }
    toggleDraftList = () =>{
        this.setState((prevState) => ({
            showDraftList: !prevState.showDraftList
        }));
    }
    render() {
        return (
            <React.Fragment>
                {   (this.props.draftPosts.length) > 0 &&
                    <div className="content-container">
                        { 
                            <Button className="button--link" onClick={ [ this.toggleDraftList ] }>
                                { this.props.draftPosts.length > 1 ? `Show ${this.props.draftPosts.length} draft posts` : `Show draft`}
                            </Button>
                        }
                        <div className="list-body">
                        { this.state.showDraftList &&
                            this.props.draftPosts.map((post) => {
                                if(post) {
                                    return <PostListItem  key={ post.id} post={ post } />
                                    }
                                })
                        }
                        </div>
                    </div>
                }
                { (this.props.visiblePosts.length > 0) ?
                    <div className="content-container">
                        <div className="list-body">
                        {
                            this.props.visiblePosts.map((post) => {
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
        );
    }
};

const mapStateToProps = (state) => {
    let draftPosts = [];
    return {
        visiblePosts: state.postList.map((post) => {
            if(post.id && post.isPublished === true) {
                return post;
            } else if(post.id && post.isPublished === false) {
                if(state.auth.uid === post.postUid) { draftPosts.push(post) }
                return;
            }
        }),
        draftPosts,
        showDrafts: state.filters.showDrafts
    };
};

export default connect(mapStateToProps)(PostList);