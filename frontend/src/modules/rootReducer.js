import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import exercises from './exercises/reducer';

const rootReducer = combineReducers({
  auth,
  user,
  exercises
});

export default rootReducer;
