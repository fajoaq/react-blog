import React from 'react';

import Button from './Button';

export const SavePost = (props) => (
    <Button redirect={ props.location } onClick={ props.onClick } className={ props.className}>
        Save Post
    </Button>
);

export default SavePost;