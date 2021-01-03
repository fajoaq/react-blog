import React from 'react';
import { Link } from 'react-router-dom';

export const PageHeader = ({ post, isAuthor }) => (
    <div className="page-header">
        <div className="content-container">
        <h1 className="page-header__title">
           { (isAuthor) ? 'Edit Post' : `${post.postTitle}` }
            <div className="page-header__author">
            { `|by ${ post.postAuthor}` }
            </div>
        </h1>
        { (isAuthor) ? 
            <div>
                <Link to={{
                    pathname: `/post/${post.id}`,
                    uid: post.postUid
                    }} className="page-header__link">
                    <span className="page-header__link--title">{"Link readable at: "}</span>
                    <span>{ `https://app.com/post/${post.id}`}</span>
                </Link>
            </div>
            :
            ''
        }
        </div>
    </div>
);

export default PageHeader;