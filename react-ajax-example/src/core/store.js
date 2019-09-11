import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const initialState = {
  ui: {
    loading: true,
    postsWithLoading: [],
    post: {},
    baseUrl: 'http://jsonplaceholder.typicode.com',
  },
  posts: [],
  comments: [],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
