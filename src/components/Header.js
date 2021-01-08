import React from 'react';
import { history } from '../routers/AppRouter';
import { connect } from 'react-redux';

import { configureModal, toggleModal } from '../actions/modal';
import PostModal from './PostModal';
import Login from './Login';
import Logout from './Logout';
import AddPost from './AddPost';
import Button from './Button';

export class Header extends React.Component {
  state = {
    initiateModal: this.props.initiateModal,
    modalTitle: this.props.modalTitle,
    contentLabel: this.props.contentLabel,
    modalButtons: this.props.modalButtons
  }
  componentDidUpdate = () => {
    if (this.props.initiateModal !== this.state.initiateModal) {
      this.setState(() => ({
        initiateModal: this.props.initiateModal,
        modalTitle: this.props.modalTitle,
        contentLabel: this.props.contentLabel,
        modalButtons: this.props.modalButtons
      }));
    }
  };
  handleAuthHomeButton = () => {
    console.log('handleAuthHomeButton');
    this.props.configureModal({
      modalTitle: "Delete changes?",
      modalButtons: [
          {
            text: 'Cancel',
            className: 'button',
            onClick: [ this.props.toggleModal ]
          },
          {
            text: 'Confirm',
            className: 'button',
            onClick: [ this.props.toggleModal, this.handleHomeButton ]
          }
        ]
    });
    this.props.toggleModal();
  };
  handleHomeButton = () => {
    history.push('/');
  };
  render() {
    return (
      <header className="header">
        <PostModal
          modalTitle={ this.state.modalTitle }
          contentLabel={ this.state.contentLabel }
          modalButtons={ this.state.modalButtons }
          initiateModal={ this.state.initiateModal }
        >
        </PostModal>

        <div className="content-container">
          <div className="header__content">
            <Button 
              className="header__title button--link" 
              onClick={ this.props.isAuthor ? this.handleAuthHomeButton : this.handleHomeButton }>
                <h1>React Blog</h1>
            </Button>
            { this.props.isAuthenticated ? 
              <div>
                { history.location.pathname === '/dashboard' ?
                  <div className="button-group">
                    <AddPost />
                    <Logout />
                  </div>
                :
                  <Logout />
                }
              </div>
              :
              <Login />
            }
          </div>
        </div>
      </header>
    );
  };
};

const mapStateToProps = (state, props) => ({
  modalTitle: state.modal.modalTitle,
  contentLabel: state.modal.contentLabel,
  modalButtons: state.modal.modalButtons,
  initiateModal: state.modal.initiateModal
});

const mapDistpatchToProps = (dispatch) => ({
  configureModal: (parameters) => dispatch(configureModal(parameters)),
  toggleModal: () => dispatch(toggleModal())
});

export default connect(mapStateToProps, mapDistpatchToProps)(Header);