import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import shop from './reducers/shop';
import widget from './reducers/widget';

export default combineReducers({
  form: formReducer,
  shop,
  widget,
});
