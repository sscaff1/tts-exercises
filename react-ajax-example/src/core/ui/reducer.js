import postActions from '../posts/actions';

function uiReducer(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case postActions.GET_POST_DETAIL:
    case postActions.GET_POSTS:
      return {
        ...state,
        loading: true,
      };
    case postActions.SET_POSTS:
      return {
        ...state,
        loading: false,
      };
    case postActions.SET_POST_DETAIL:
      return {
        ...state,
        post: action.post,
        loading: false,
      };
    case postActions.START_EDIT:
      return {
        ...state,
        postsWithLoading: state.postsWithLoading.concat(action.id),
      };
    case postActions.END_EDIT:
      return {
        ...state,
        postsWithLoading: state.postsWithLoading.filter(
          id => id !== action.newPost.id
        ),
      };
    default:
      return state;
  }
}

export default uiReducer;
