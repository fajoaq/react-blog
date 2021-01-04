import React from 'react';

export class PostForm extends React.Component {
/*     componentDidMount() {
        this.props.setPostData();
    } */
    render() {
        return (
            <form className="form">
                <input className="text-input" type="text" name="postTitle" onChange={ this.props.handleTitleChange } value={ this.props.postTitle } />
                <textarea className="textarea" name="postTitle" onChange={ this.props.handleBodyTextChange } value={ this.props.postBody } />
            </form>
        );
    };
};

export default PostForm;