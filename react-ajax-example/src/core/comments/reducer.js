import postActions from '../posts/actions';

function commentReducer(state = [], action) {
  switch (action.type) {
    case postActions.SET_POST_DETAIL:
      return action.comments;
    default:
      return state;
  }
}

export default commentReducer;
