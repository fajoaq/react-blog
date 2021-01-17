import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import moment from 'moment';

import { startAddPost } from '../actions/posts';
import { AiFillPlusCircle } from 'react-icons/ai';

export class AddPost extends React.Component {
    onAddPost = () => {
        const post = {
            postTitle: "new post",
            postBody: "This is the post body",
            created: moment().valueOf()
        };
        
        this.props.startAddPost(post).then((post) => {
            history.push({
                pathname: `/edit/${post.postId}`, 
                state: {post}
            });
        }); 
    };

    render() {
        return (
            <button className="button button--link button--add-post" onClick={ this.onAddPost }>
                <AiFillPlusCircle />
            </button>
        );
    };
}

const mapStateToProps = (state) => ({
    userUid: state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
    startAddPost: (post) => dispatch(startAddPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);