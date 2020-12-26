import React from 'react';
import { Link } from 'react-router-dom';

export const PostListItem = ({ post }) => (
    <Link to={`/post/${post.id}`} className="post-item__container">
        <div className="post-item__text">New Post ID: { post.postTitle }.</div>
    </Link>
);
export default PostListItem;