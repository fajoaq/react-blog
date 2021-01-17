import { firebase } from '../firebase/firebase';

const defaultAuthState = {
    uid: undefined,
    displayName: "Anon"
};

export default (state = defaultAuthState, action) => {
    switch(action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                ...action.userData
            };
        case 'LOGIN':
            return {
                displayName: firebase.auth().currentUser.displayName,
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        case 'RESET':
            return {};
        default:
            return state;
    };
};