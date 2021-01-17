import { firebase, googleAuthProvider, gitHubAuthProvider } from '../firebase/firebase';
import { history } from '../routers/AppRouter';

export const login = ({ uid }) => ({
    type: 'LOGIN',
    uid
});

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
    return (dispatch) => firebase.auth().signInWithPopup(provider).then((result) => {
/*         console.log(result.user.displayName);
        dispatch(setDisplayName(result.user.displayName));   */          
/*         dispatch(startChangeDisplayName()); */
        if(history.location.pathname.includes('post')) {
            history.push('/');
        }
    });
};

export const setDisplayName = (displayName) => ({
    type: 'SET_DISPLAY_NAME',
    displayName
})

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        firebase.auth().signOut();
        logout();
    };
};

//RESET 
export const reset = () => ({
    type: 'RESET'
  })