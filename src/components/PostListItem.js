import React from 'react';
import { Link } from 'react-router-dom';

export const PostListItem = ({ post }) => (
    <Link to={{
        pathname: `/edit/${post.id}`,
        state: {uid: post.postUid}
    }} className="post-item__container">
        <div className="post-item__text">{`${post.postTitle} | id: ${post.id}` }.</div>
    </Link>
);
export default PostListItem;