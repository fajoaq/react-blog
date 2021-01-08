import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadingPage from './LoadingPage';
import Button  from './Button';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { configureModal, toggleModal } from '../actions/modal';
import { history } from '../routers/AppRouter';

export class PostHeader extends React.Component {
    handleAuthBackButton = () => {
        console.log('HERE');
        this.props.configureModal({
            modalButtons: [
                {
                    text: 'Save Draft',
                    className: 'button',
                    onClick: this.props.toggleModal
                  },
                  {
                    text: 'Delete',
                    className: 'button',
                    onClick: this.props.toggleModal
                  }
              ]
        });
        this.props.toggleModal();
    };
    handleBackButton = () => {
        history.push('/dashboard');
    };
    render() {
        return (
            <div>
            { (!!this.props.post) ?
                <div className="page-header">
        
                    <Button 
                        className="page-header__back-button" 
                        onClick={ this.props.isAuthor ? this.handleAuthBackButton : this.handleBackButton }>
                            <AiOutlineDoubleLeft className="page-header__back-image"/>
                    </Button>
                    <div className="container--flex container--flex-center container--margin-left ">
                        <div>
                            <h1 className="page-header__title">
                            { (this.props.post.isAuthor) ? 'Edit Post' : `${this.props.post.postTitle}` }
                                <div className="page-header__author">
                                { `|by ${ this.props.post.postAuthor}` }
                                </div>
                            </h1>
                            { (this.props.post.isAuthor) ? 
                                <div>
                                    <Link to={{
                                        pathname: `/post/${this.props.post.id}`,
                                        uid: this.props.post.postUid
                                        }} className="page-header__link">
                                        <span className="page-header__link--title">{"Link readable at: "}</span>
                                        <span>{ `https://app.com/post/${this.props.post.id}`}</span>
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
    };
};

const mapDistpatchToProps = (dispatch) => ({
    configureModal: (parameters) => dispatch(configureModal(parameters)),
    toggleModal: () => dispatch(toggleModal())
});

export default connect(undefined, mapDistpatchToProps)(PostHeader);