import { firebase, googleAuthProvider, gitHubAuthProvider } from '../firebase/firebase';
import { history } from '../routers/AppRouter';

export const login = ({ uid, displayName }) => ({
    type: 'LOGIN',
    uid,
    displayName
});

export const startLogin = ({ target }) => {
    let provider = undefined;
    switch(target.name) {
        case 'googleLogin':
            provider = firebase.auth().signInWithPopup(googleAuthProvider);
        case 'gitHubLogin':
            provider = firebase.auth().signInWithPopup(gitHubAuthProvider);
        default:
            provider = firebase.auth().signInWithPopup(googleAuthProvider);
    }
    return () => provider.then(() => {
        if(history.location.pathname.includes('post')) {
            history.push('/dashboard');
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