const postActions = {
  GET_POSTS: 'GET_POSTS',
  SET_POSTS: 'SET_POSTS',
  GET_POST_DETAIL: 'GET_POST_DETAIL',
  SET_POST_DETAIL: 'SET_POST_DETAIL',
  START_EDIT: 'START_EDIT',
  END_EDIT: 'END_EDIT',
  DELETE_POST: 'DELETE_POST',

  getPosts: userId => (dispatch, getState) => {
    const { ui } = getState();
    const endpoint = userId ? `posts?userId=${userId}` : 'posts';
    dispatch({ type: postActions.GET_POSTS });
    return fetch(`${ui.baseUrl}/${endpoint}`)
      .then(resp => resp.json())
      .then(posts => {
        dispatch({ type: postActions.SET_POSTS, posts });
      });
  },

  getPostDetail: id => (dispatch, getState) => {
    const { ui } = getState();
    dispatch({ type: postActions.GET_POST_DETAIL });
    Promise.all([
      fetch(`${ui.baseUrl}/posts/${id}`).then(resp => resp.json()),
      fetch(`${ui.baseUrl}/comments?postId=${id}`).then(resp => resp.json()),
    ]).then(data => {
      const [postDetails, postComments] = data;
      dispatch({
        type: postActions.SET_POST_DETAIL,
        post: postDetails,
        comments: postComments,
      });
    });
  },

  editPost: (id, userId, title, body) => (dispatch, getState) => {
    const { ui } = getState();
    dispatch({ type: postActions.START_EDIT, id });
    return fetch(`${ui.baseUrl}/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        title,
        body,
        userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(newPost => {
        dispatch({ type: postActions.END_EDIT, newPost });
      });
  },

  deletePost: id => ({ type: postActions.DELETE_POST, id }),
};

export default postActions;
