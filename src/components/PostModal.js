import React from 'react';
import Modal from 'react-modal';

export const PostModal = (props) => (
    <Modal
        isOpen={!!props.initiateRemove}
        contentLabel="Remove expense?"
        closeTimeoutMS={350}
        appElement={app}
        parentSelector={() => document.querySelector('#app')}
        shouldCloseOnEsc={ true }
        shouldCloseOnOverlayClick={ true }
        onRequestClose={ props.handleClearRemove }
        className="modal-container"
    >
        <div className={ !!props.initiateRemove ? "modal modal--open" : "modal" }>
            <h3 className="modal__title">Remove Post? </h3>
            <p className="modal__subtitle">{ props.contentLabel}</p>
            <div className="button-group">
                <button id="cancel" className="button" onClick={ props.handleClearRemove }>Cancel</button>
                <button id="confirm" className="button" onClick={ props.onRemove }>Confirm</button>
            </div>
        </div>
    </Modal>
);

export default PostModal;