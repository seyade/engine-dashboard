import {
  GET_USERS,
  GET_USERS_BEGIN,
  GET_USERS_FAILED
} from '../actions/usersActions';

const InitialState = {
  users: [],
  loading: false,
  errors: null
};

export default function usersReducer(state = InitialState, action) {
  switch (action.type) {
    case GET_USERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };

    default:
      return state;
  }
}
