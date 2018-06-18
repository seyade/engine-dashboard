import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_ERRORS = 'GET_ERRORS';

/**
 * Sign in user
 *
 * @description Get user token
 * @param {object} signinData
 */
export const signinUser = signinData => dispatch => {
  console.log('SINGIN USER WITH DATA: ', signinData);

  axios
    .post('/api/users/login', signinData)
    .then(res => {
      console.log('USER FOUND!!');

      const { token } = res.data;

      localStorage.setItem('authKey', token);

      setAuthKey(token);

      const decoded = jwtDecode(token);

      console.log('DECODED', decoded);

      dispatch(setCurrentUser(decoded));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

/**
 * Set the curently signed-in user
 *
 * @param {object} decoded
 */
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

/**
 * Set key to header
 * @param {string} token
 */
function setAuthKey(token) {
  if (token) {
    //Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
