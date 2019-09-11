import postActions from './actions';

function postReducer(state = [], action) {
  switch (action.type) {
    case postActions.SET_POSTS:
      return action.posts;
    case postActions.END_EDIT:
      return state.map(post => {
        if (post.id === action.newPost.id) {
          return action.newPost;
        }
        return post;
      });
    case postActions.DELETE_POST:
      return state.filter(post => post.id !== action.id);
    default:
      return state;
  }
}

export default postReducer;
