import { firebase, googleAuthProvider, gitHubAuthProvider } from '../firebase/firebase';
import { history } from '../routers/AppRouter';

// Set provider
const setProvider = (id) => {
    switch(id) {
        case 'googleLogin':
            return googleAuthProvider;
        case 'gitHubLogin':
            return gitHubAuthProvider;
        default:
            return googleAuthProvider;
    }
}; 
// START LOGIN
export const startLogin = ({ target }) => {
    const provider = setProvider(target.id);
    return () => firebase.auth().signInWithPopup(provider).then(() => {
        if(history.location.pathname.includes('post')) {
            history.push('/');
        }
    });
};
//Log in
export const login = ({ uid }) => ({
    type: 'LOGIN',
    uid
});
//Start log out
export const startLogout = () => {
    return () => {
        firebase.auth().signOut();
        logout();
    };
};
// Log out
export const logout = () => ({
    type: 'LOGOUT'
});

//RESET 
export const reset = () => ({
    type: 'RESET'
  })