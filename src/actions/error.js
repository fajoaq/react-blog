// SET_ERROR_MESSAGE
export const setErrorMessage = (id, message) => ({
  type: 'SET_ERROR_MESSAGE',
    error: {id, message}
});
// CLEAR_ERROR_MESSAGE
export const clearErrorMessage = (id) => ({
  type: 'CLEAR_ERROR_MESSAGE',
  id
})