import { combineReducers } from 'redux';

import auth from './reducers/auth.redux';
import errors from './reducers/error.redux';

export default combineReducers({
    auth,
    errors,
});
