import React from 'react';
import { connect } from 'react-redux';
import { AiOutlineFileExclamation, AiOutlineFileExcel } from 'react-icons/ai';

import { startSetPosts } from '../actions/posts';
import { setVisiblePosts } from '../actions/posts';
import PostListItem from './PostListItem';
import Button from './Button';

export class PostList extends React.Component {
    state = {
        filters: this.props.filters,
        visiblePosts: this.props.visiblePosts,
        visibleDrafts: this.props.visibleDrafts
    }
/*     componentDidMount = () => {
        this.props.startSetPosts().then(() => {
            const visiblePosts = setVisiblePosts(this.props.postList, this.props.filters);
            const visibleDrafts = setVisiblePosts(this.props.draftList, this.props.filters);
            this.setState(() => ({
                postList: this.props.postList,
                visibleDrafts,
                visiblePosts
            }));
        });
    }; */
    componentDidUpdate = () => {
        if ((this.props.filters !== this.state.filters)
            ||
            (this.props.visibleDrafts !== this.state.visibleDrafts)
            ||
            (this.props.visiblePosts !== this.state.visiblePosts)
        ) {
            this.setState(() => ({
                filters: this.props.filters,
                visiblePosts: this.props.visiblePosts,
                visibleDrafts: this.props.visibleDrafts
            }));
        }
      };
    toggleDraftList = () =>{
        this.setState((prevState) => ({
            showDraftList: !prevState.showDraftList
        }));
    }
    render() {
        return (
            <React.Fragment>
                {   (this.state.visibleDrafts && (this.state.visibleDrafts.length > 0)) &&
                    <div className="content-container">
                        { 
                            <Button className="button--link" onClick={ [ this.toggleDraftList ] }>
                                { this.state.showDraftList ? 
                                    <span>Hide draft list <AiOutlineFileExcel /></span>
                                    :
                                    <span>
                                        { this.state.visibleDrafts.length > 1 ? 
                                            `Show ${this.state.visibleDrafts.length} draft posts ` 
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
                            this.state.visibleDrafts.map((post) => {
                                if(post) {
                                    return <PostListItem  key={ post.postId} post={ post } />
                                    }
                                })
                        }
                        </div>
                    </div>
                }
                { (this.state.visiblePosts.length > 0) ?
                    <div className="content-container">
                        <div className="list-body">
                        {
                            this.state.visiblePosts.map((post) => {
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

const mapStateToProps = (state) => ({
    visiblePosts: setVisiblePosts(state.postList, state.filters),
    visibleDrafts: setVisiblePosts(state.draftList, state.filters),
    filters: state.filters,
    showDrafts: state.filters.showDrafts
});
const mapDispatchToProps = (dispatch) => ({
  startSetPosts: () => dispatch(startSetPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);