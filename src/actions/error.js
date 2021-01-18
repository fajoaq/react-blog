// SET_ERROR_MESSAGE
export const setErrorMessage = (id, message) => ({
  type: 'SET_ERROR_MESSAGE',
    error: {id, message}
});
// CLEAR_ERROR_MESSAGE
export const clearErrorMessage = (id) => {
  if(id !== undefined) {
    return {
      type: 'CLEAR_ERROR',
      id
    };
  } else {
    return {
      type: 'CLEAR_ERROR_MESSAGES'
      };
  }
};