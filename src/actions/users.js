import database, { firebase } from '../firebase/firebase';

export const startChangeDisplayName = (displayName) => {
  return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`/user/${uid}/`).update({displayName}).then(() => {
        dispatch(updateUser({displayName}));
        firebase.auth().currentUser.updateProfile({
          displayName
        });
      });
  };
}
export const updateUser = (userData) => ({
  type: 'UPDATE_USER',
  userData
});