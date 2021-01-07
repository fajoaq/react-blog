import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadingPage from './LoadingPage';
import Button  from './Button';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { toggleModal } from '../actions/modal';
import { history } from '../routers/AppRouter';

const backButton = () => {
    history.push('/dashboard');
};

export const PostHeader = (props) => (
    <div>
    { (!!props.post) ?
        <div className="page-header">

            <Button 
                className="page-header__back-button" 
                onClick={ props.isAuthor ? props.toggleModal : backButton }>
                    <AiOutlineDoubleLeft className="page-header__back-image"/>
            </Button>
            <div className="container--flex container--flex-center container--margin-left ">
                <div>
                    <h1 className="page-header__title">
                    { (props.post.isAuthor) ? 'Edit Post' : `${props.post.postTitle}` }
                        <div className="page-header__author">
                        { `|by ${ props.post.postAuthor}` }
                        </div>
                    </h1>
                    { (props.post.isAuthor) ? 
                        <div>
                            <Link to={{
                                pathname: `/post/${props.post.id}`,
                                uid: props.post.postUid
                                }} className="page-header__link">
                                <span className="page-header__link--title">{"Link readable at: "}</span>
                                <span>{ `https://app.com/post/${props.post.id}`}</span>
                            </Link>
                        </div>
                        :
                        ''
                    }
                </div>
            </div>
        </div>
    :
    <LoadingPage />
    }
    </div>
);

const mapDistpatchToProps = (dispatch) => ({
    toggleModal: () => dispatch(toggleModal())
});

export default connect(undefined, mapDistpatchToProps)(PostHeader);