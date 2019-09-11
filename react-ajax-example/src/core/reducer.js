import { combineReducers } from 'redux';
import commentsReducer from './comments/reducer';
import uiReducer from './ui/reducer';
import postsReducer from './posts/reducer';

export default combineReducers({
  comments: commentsReducer,
  ui: uiReducer,
  posts: postsReducer,
});
