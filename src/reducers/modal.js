const defaultModalState = {
    modalTitle: '',
    contentLabel: '',
    modalButtons: [],
    initiateModal: false,
    dataHasChanged: false
}

export default (state = defaultModalState, action) => {
    console.log(action.type);
    switch(action.type) {
        case 'TOGGLE_MODAL':
            const newModalState = !state.initiateModal
            return {
                ...state,
                initiateModal: newModalState
            }
        case 'CONFIGURE_MODAL':
            return {
                ...state,
                ...action.parameters
            };
        default:
            return state;
    };
};