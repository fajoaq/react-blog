import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';

import LoadingPage from './LoadingPage';
import Button  from './Button';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { configureModal, toggleModal } from '../actions/modal';
import { history } from '../routers/AppRouter';
import { startChangeDisplayName } from '../actions/users';

export class PostHeader extends React.Component {
    handleAuthBackButton = () => {
        this.props.configureModal({
            modalTitle: 'Discard changes?',
            contentLabel: '',
            modalButtons: [
                {
                    modalTitle: "Discard changes?",
                    text: 'Cancel',
                    className: 'button',
                    onClick: [ this.props.toggleModal ]
                  },
                  {
                    text: 'Confirm',
                    className: 'button',
                    onClick: [ this.props.toggleModal, this.handleBackButton ]
                  }
              ],
              dataHasChanged: false
        });
    };
    handleBackButton = () => {
        history.push('/dashboard');
    };
    handleChangeDisplayName = ({target}) => {
        this.props.startChangeDisplayName(validator.escape(target.value));
    };
    render() {
        return (
            <React.Fragment>
            { (!!this.props.post) ?
                <div className="page-header">
        
                    <Button 
                        className="page-header__back-button" 
                        onClick={ (this.props.isAuthor && this.props.dataHasChanged) ? 
                            [this.handleAuthBackButton, this.props.toggleModal] 
                            : 
                            [this.handleBackButton] }>
                                <AiOutlineDoubleLeft className="page-header__back-image"/>
                    </Button>
                    <div className="container--flex container--flex-center container--margin-left ">
                        <div>
                            <h1 className="page-header__title">
                            { (this.props.post.isAuthor) ? 'Edit Post' : `${this.props.post.postTitle}` }
                                <div className="page-header__author">
                                { this.props.isAuthor ? 
                                    <input type="text" onChange={ this.handleChangeDisplayName } placeholder={`by ${ this.props.post.authorName}`}/>
                                    :
                                    `by| ${this.props.post.authorName}`
                                }
                                </div>
                            </h1>
                            { (this.props.post.isAuthor) ? 
                                <div>
                                    <Link to={{
                                        pathname: `/post/${this.props.post.postId}`,
                                        uid: this.props.post.authId
                                        }} className="page-header__link">
                                        <span className="page-header__link--title">{"Link readable at: "}</span>
                                        <span>{ `https://app.com/post/${this.props.post.postId}`}</span>
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
            </React.Fragment>
        );
    };
};

const mapStateToProps = (state) => ({
    dataHasChanged: state.modal.dataHasChanged,
    uid: state.auth.uid
  });

const mapDistpatchToProps = (dispatch) => ({
    configureModal: (parameters) => dispatch(configureModal(parameters)),
    toggleModal: () => dispatch(toggleModal()),
    startChangeDisplayName: (authorName) => dispatch(startChangeDisplayName(authorName))
});

export default connect(mapStateToProps, mapDistpatchToProps)(PostHeader);