import { firebase } from '../firebase/firebase';

const defaultAuthState = {
    uid: undefined,
    displayName: "Anon"
};

export default (state = defaultAuthState, action) => {
    switch(action.type) {
        case 'SET_DISPLAY_NAME':
            return {
                ...state,
                displayName: action.displayName
            };
        case 'LOGIN':
            return {
                displayName: firebase.auth().currentUser.displayName,
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    };
};