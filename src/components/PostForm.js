import React from 'react';

import Error from './Error';

export const PostForm = (props) => (
    <form className="form">
        <Error id='title-limit' />
        <input className="text-input" type="text" name="postTitle" onChange={ props.handleTitleChange } value={ props.postTitle } />
        <Error id='textarea-limit' />
        <textarea className="textarea" name="postTitle" onChange={ props.handleBodyTextChange } value={ props.postBody } />
        <div>{ props.textareaCount && props.textareaCount }/1200</div>
    </form>
);

export default PostForm;