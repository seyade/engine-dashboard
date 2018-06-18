import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_BEGIN = 'GET_USERS_BEGIN';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

export const getUsersBegin = () => ({
  type: GET_USERS_BEGIN
});

export const getUsersFailed = error => ({
  type: GET_USERS_FAILED,
  payload: 'Oops! Cannot get users: ' + error
});

export const getUsersSuccess = users => ({
  type: GET_USERS,
  payload: users.data
});

export const loadUsers = () => dispatch => {
  return axios
    .get('/api/users/all')
    .then(response => {
      dispatch(getUsersSuccess(response));
    })
    .catch(error => dispatch(getUsersFailed(error)));
};
