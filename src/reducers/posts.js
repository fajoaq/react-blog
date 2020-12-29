
export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_POST':
            return [
                ...state,
                action.post
            ];
        case 'REMOVE_POST':
            return state.filter((post) => {
                return post.id !== action.id;
            });
        case 'SET_POSTS':
            return action.posts;
        case 'UPDATE_POST':
            let updateList = state.filter((post) => post.id !== action.post.id );
            return [
                ...updateList,
                action.post
            ];
        default:
            return state;
    };
};