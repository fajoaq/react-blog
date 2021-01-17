import database, { firebase } from '../firebase/firebase';

export const startSetUsers = () => {
    console.log('startSetUsers');
    return (dispatch) => {
        return database.ref(`/users`).once('value').then((snapshot) => {
        const users = [];
        snapshot.forEach((user) => {
          users.push({
            uid: user.key,
            ...user.val()
          });
        });
        dispatch(setUsers(users));
        return users;
      });
    };
};

export const startSetSingleUser = (uid) => {
  console.log('startSetSingleUsers', uid);
  return (dispatch) => {
      return database.ref(`/users/${uid}`).once('value').then((snapshot) => {
      const user = {
        uid: snapshot.key,
        ...snapshot.val()
      };
      dispatch(setUsers([user]));
      return user;
    });
  };
};

export const startChangeDisplayName = (displayName) => {
  console.log('startChangeDisplayName');
  return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`/users/${uid}/`).update({displayName}).then(() => {
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