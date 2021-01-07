import React from 'react';
import Modal from 'react-modal';

import Button from './Button';

const createModalButtons = (buttons = []) => {
    const jsx = buttons.map((button) => {
        return <Button
                key={ button.text } 
                className={ button.className } 
                onClick={ button.onClick}> 
                    { button.text }
                </Button>
    });
    return jsx;
};

export const PostModal = (props) => (

    <Modal
        isOpen={ props.initiateModal }
        modalTitle={ props.modalTitle }
        contentLabel={props.contentLabel }
        modalButtons={ props.modalButtons }
        closeTimeoutMS={350}
        appElement={app}
        parentSelector={() => document.querySelector('#app')}
        shouldCloseOnEsc={ true }
        shouldCloseOnOverlayClick={ true }
        onRequestClose={ props.handleClearModal }
        className="modal-container"
    >
        <div className={ !!props.initiateModal ? "modal modal--open" : "modal" }>
            <h3 className="modal__title">{ props.modalTitle ? props.modalTitle : 'Remove Post?'} </h3>
            <p className="modal__subtitle">{ props.contentLabel }</p>
            <div className="button-group">
                { props.modalButtons ? createModalButtons(props.modalButtons) : <button>Okay</button> }
            </div>
        </div>
    </Modal>
);

export default PostModal;