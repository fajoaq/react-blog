import { login, logout } from '../../actions/auth';

test("Should call login action object", () => {
  const uid = '12345abc';
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test("Should call logout action object", () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});