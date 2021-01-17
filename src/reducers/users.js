export default (state = [], action) => {
    console.log(action.type);
    switch(action.type) {
        case 'UPDATE_USER':
            return [
                ...state,
                actions.userData
            ];
        case 'RESET':
            return [];
        default:
            return state;
    };
};