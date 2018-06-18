import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import UsersReducer from './usersReducer';
import ErrorsReducer from './errorsReducer';

export default combineReducers({
  auth: AuthReducer,
  users: UsersReducer,
  errors: ErrorsReducer
});
