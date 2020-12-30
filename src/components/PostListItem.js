import React from 'react';
import { Link } from 'react-router-dom';

export const PostListItem = ({ post }) => (
    <Link to={`/edit/${post.id}`} className="post-item__container">
        <div className="post-item__text">{`${post.postTitle} | id: ${post.id}` }.</div>
    </Link>
);
export default PostListItem;