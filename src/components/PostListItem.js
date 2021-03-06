import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const PostListItem = ({ post }) => (
    <Link to={{
        pathname: `/edit/${post.postId}`,
        state: {uid: post.authId}
    }} className="list-item">
        <div>
            <h4 className="list-item__title">{`${post.postTitle}`}</h4>
        </div>
        <div className="list-item__subtitle--container">
            <span className="list-item__subtitle">{` | by: ${post.authorName}` }</span>
        </div>
        <div className="list-item__data list-item__subtitle">
           { `created ${moment(post.created).fromNow()}` }
        </div>
    </Link>
);
export default PostListItem;