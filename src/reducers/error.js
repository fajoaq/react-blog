export default (state = [], action) => {
    switch(action.type) {
        case 'SET_ERROR_MESSAGE':
            const newError = state.find((e) => e.id === action.error.id);
            if(newError === undefined) {
                return [
                    ...state,
                    action.error
                ];
            } else return state;
        case 'CLEAR_ERROR':
            const error = state.find((e) => e.id === action.id);
            if(error) {
                return state.filter((e) => {
                    return e.id !== action.id;
                });
            } else return state;
        case 'CLEAR_ERROR_MESSAGES':
            return [];
        case 'RESET':
            return [];
        default:
            return state;
    };
};