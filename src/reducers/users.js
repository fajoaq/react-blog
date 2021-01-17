export default (state = [], action) => {
    console.log(action.type);
    switch(action.type) {
        case 'SET_USERS':
            return action.users;
        case 'RESET':
            return [];
        default:
            return state;
    };
};