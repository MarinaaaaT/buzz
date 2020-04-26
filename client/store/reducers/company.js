import update from 'immutability-helper';
import { LOGIN_COMPANY, LOGOUT_COMPANY, UPDATE_COMPANY } from '_actions/company';

export default function company(state = {}, action) {
  switch (action.type) {
    case LOGIN_COMPANY:
      return action.company;
    case LOGOUT_COMPANY:
      return {};
    case UPDATE_COMPANY:
      return update(state, { $merge: action.company });
    default:
      return state;
  }
}
