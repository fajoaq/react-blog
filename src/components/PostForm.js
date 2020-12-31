import React from 'react';

export const PostForm = (props) => (
    <form className="form">
        <input className="text-input" type="text" name="postTitle" onChange={ props.handleTitleChange } value={ props.postTitle } />
        <textarea className="textarea" name="postTitle" onChange={ props.handleBodyTextChange } value={ props.postBody } />
    </form>
);

export default PostForm;