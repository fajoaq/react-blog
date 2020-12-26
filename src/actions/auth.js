import { firebase, googleAuthProvider, gitHubAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = ({ target }) => {
    switch(target.id) {
        case 'googleLogin':
            return () =>{
                return firebase.auth().signInWithPopup(googleAuthProvider);
            };
        case 'gitHubLogin':
            return () =>{
                return firebase.auth().signInWithPopup(gitHubAuthProvider);
            };
        default:
            throw new Error('Please provide a service id');
    }
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};