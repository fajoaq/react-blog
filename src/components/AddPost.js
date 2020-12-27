import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { startAddPost } from '../actions/posts';

export class AddPost extends React.Component {
    onAddPost = () => {
        const post = {
            postTitle: "new post"
        };
    
        this.props.startAddPost(post);
    };

    render() {
        return (
            <div className="content-container">
                <button onClick={ this.onAddPost }>Add Post</button>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => ({
    startAddPost: (post) => dispatch(startAddPost(post))
})

export default connect(undefined, mapDispatchToProps)(AddPost);