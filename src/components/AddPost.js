import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import moment from 'moment';

import { startAddPost } from '../actions/posts';
import { AiFillPlusCircle } from 'react-icons/ai';

const post = {
    postTitle: "new post",
    postBody: "This is the post body",
    created: moment().valueOf()
};

export const AddPost = (props) => (
    <button className="button button--link button--add-post" onClick={ () => {       
        props.startAddPost(post).then((post) => {
            history.push({
                pathname: `/edit/${post.postId}`, 
                state: {post}
            });
        }); 
    } }>
        <AiFillPlusCircle />
    </button>
);

const mapStateToProps = (state) => ({
    userUid: state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
    startAddPost: (post) => dispatch(startAddPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);