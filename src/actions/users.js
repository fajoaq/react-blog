import database, { firebase } from '../firebase/firebase';

export const startChangeDisplayName = (displayName) => {
  console.log('startChangeDisplayName');
  return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`/user/${uid}/`).update({displayName}).then(() => {
        dispatch(updateUser({uid, displayName}));
        firebase.auth().currentUser.updateProfile({
          displayName
        });
      });
  };
}

export const setUsers = (users) => ({
  type: 'SET_USERS', 
  users
});

export const updateUser = (user) => ({
  type: 'UPDATE_USER',
  user
})

//RESET 
export const reset = () => ({
  type: 'RESET'
})