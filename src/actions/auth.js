import { firebase, googleAuthProvider, gitHubAuthProvider } from '../firebase/firebase';
import { history } from '../routers/AppRouter';

export const login = ({ uid, displayName }) => ({
    type: 'LOGIN',
    uid,
    displayName
});

export const startLogin = ({ target }) => {
    let provider = undefined;
    switch(target.id) {
        case 'googleLogin':
            provider = googleAuthProvider;
            break;
        case 'gitHubLogin':
            console.log(target.id);
            provider = gitHubAuthProvider;
            break;
        default:
            provider = googleAuthProvider;
            break;
    }
    return () => firebase.auth().signInWithPopup(provider).then(() => {
        if(history.location.pathname.includes('post')) {
            history.push('/');
        }
    });
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        firebase.auth().signOut();
        logout();
    };
};