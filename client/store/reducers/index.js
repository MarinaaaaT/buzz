import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as alerts } from 'react-notification-system-redux';
import user from './user';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  alerts,
  user,
});

export default createRootReducer;
