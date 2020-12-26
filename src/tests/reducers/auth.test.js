import authReducer from '../../reducers/auth';

test("Should set user id", () => {
    const uid = 'abc1234';
    const action = { type: 'LOGIN', uid };
    const state = authReducer({}, action);
    expect(state).toEqual({ uid });
});

test("Should clear user id", () => {
    const uid = 'abc12345';
    const prevState = { uid };
    const action = { type: 'LOGOUT'};
    const state = authReducer(prevState, action);
    expect(state).toEqual({});
});