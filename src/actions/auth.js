import { firebase, googleAuthProvider, gitHubAuthProvider } from '../firebase/firebase';
import { history } from '../routers/AppRouter';

export const login = ({ uid, displayName }) => ({
    type: 'LOGIN',
    uid,
    displayName
});

export const startLogin = ({ target }) => {
    switch(target.name) {
        case 'googleLogin':
            return () => {
                firebase.auth().signInWithPopup(googleAuthProvider).then(() => {   
                    if(history.location.pathname.includes('post')) {
                        history.push('/dashboard');
                    }
                });
            }
        case 'gitHubLogin':
            return () => {
                firebase.auth().signInWithPopup(gitHubAuthProvider);
                    if(history.location.pathname.includes('post')) {
                        history.push('/dashboard');
                    }
            }
        default:
            return () => {
                firebase.auth().signInWithPopup(googleAuthProvider);
                    if(history.location.pathname.includes('post')) {
                        history.push('/dashboard');
                    }
            }
    }
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