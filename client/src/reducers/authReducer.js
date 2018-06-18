import { isEmpty } from '../utils/is-empty';
import { SET_CURRENT_USER } from '../actions/authActions';

const InitialAuthState = {
  isAuthenticated: false,
  loading: false,
  user: {}
};

export default function(state = InitialAuthState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
