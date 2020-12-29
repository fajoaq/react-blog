import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { startAddPost } from '../actions/posts';
import { AiFillPlusCircle } from 'react-icons/ai';

export class AddPost extends React.Component {
    onAddPost = () => {
        const post = {
            postTitle: "new post",
            postBody: "This is the post body"
        };
    
        this.props.startAddPost(post);
    };

    render() {
        return (
            <div className="content-container">
                <button onClick={ this.onAddPost }><AiFillPlusCircle /></button>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => ({
    startAddPost: (post) => dispatch(startAddPost(post))
})

export default connect(undefined, mapDispatchToProps)(AddPost);