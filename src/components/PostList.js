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
                <Button onClick={ [ this.toggleDraftList ] }>Show drafts</Button>
                { (this.props.draftPosts.length > 0 && this.state.showDraftList) &&
                    <div className="content-container">
                        <div className="list-body">
                        {
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
                draftPosts.push(post)
                return;
            }
        }),
        draftPosts,
        showDrafts: state.filters.showDrafts
    };
};

export default connect(mapStateToProps)(PostList);