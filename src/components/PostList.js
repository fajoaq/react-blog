import React from 'react';
import { connect } from 'react-redux';
import { AiOutlineFileExclamation, AiOutlineFileExcel } from 'react-icons/ai';

import { startSetPosts } from '../actions/posts';
import PostListItem from './PostListItem';
import Button from './Button';

export class PostList extends React.Component {
    state = {
        showDraftList: false
    }
/*     componentDidMount = () => {
        if(this.props.visiblePosts === 0 && this.props.draftList === 0) {
            this.props.startSetPosts();
        }
    }; */
    toggleDraftList = () =>{
        this.setState((prevState) => ({
            showDraftList: !prevState.showDraftList
        }));
    }
    render() {
        return (
            <React.Fragment>
                {   (this.props.draftList.length) > 0 &&
                    <div className="content-container">
                        { 
                            <Button className="button--link" onClick={ [ this.toggleDraftList ] }>
                                { this.state.showDraftList ? 
                                    <span>Hide draft list <AiOutlineFileExcel /></span>
                                    :
                                    <span>
                                        { this.props.draftList.length > 1 ? 
                                            `Show ${this.props.draftList.length} draft posts ` 
                                            : 
                                            `Show draft list `
                                        }
                                        <AiOutlineFileExclamation />
                                    </span>
                                }
                            </Button>
                        }
                        <div className="list-body list-body--draft">
                        { !!this.state.showDraftList &&
                            this.props.draftList.map((post) => {
                                if(post) {
                                    return <PostListItem  key={ post.postId} post={ post } />
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
                                    return <PostListItem  key={ post.postId} post={ post } />
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
    return {
        visiblePosts: state.postList,
        draftList: state.draftList,
        showDrafts: state.filters.showDrafts
    }
 /*    let draftList = [];
    return {
        visiblePosts: state.postList.map((post) => {
            console.log('POST', post);
            if(post.postId) {
                return post;
            } else if(post.id && post.isPublished === false) {
                if(state.auth.uid === post.postUid) { draftList.push(post) }
                return;
            }
        }),
        draftList,
        showDrafts: state.filters.showDrafts
    }; */
};

export default connect(mapStateToProps)(PostList);