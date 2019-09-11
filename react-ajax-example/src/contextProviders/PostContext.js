import React, { createContext, useReducer } from 'react';

const PostContext = createContext({});

const initialStateDefault = {
  posts: [],
  loading: true,
  postsWithLoading: [],
};

const actions = {
  GET_POSTS: 'GET_POSTS',
  SET_POSTS: 'SET_POSTS',
  EDIT_POST: 'EDIT_POST',
  DELETE_POST: 'DELETE_POST',
  START_EDIT: 'START_EDIT',
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };
    case actions.EDIT_POST:
      console.log(action);
      return {
        ...state,
        postsWithLoading: state.postsWithLoading.filter(
          postId => postId !== action.newPost.id
        ),
        posts: state.posts.map(post => {
          if (post.id === action.newPost.id) {
            return action.newPost;
          }
          return post;
        }),
      };
    case actions.DELETE_POST:
    case actions.GET_POSTS:
      return {
        ...state,
        loading: true,
      };
    case actions.START_EDIT:
      return {
        ...state,
        postsWithLoading: state.postsWithLoading.concat(action.postId),
      };
    default:
      return state;
  }
}

function PostProvider({
  children,
  baseUrl,
  initialState = initialStateDefault,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPosts = () => {
    dispatch({ type: actions.GET_POSTS });
    return fetch(`${baseUrl}/posts`)
      .then(resp => resp.json())
      .then(posts => {
        dispatch({ type: actions.SET_POSTS, posts });
      });
  };

  function editPost(postId, userId, title, body) {
    dispatch({ type: actions.START_EDIT, postId });
    return fetch(`${baseUrl}/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: postId,
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
        dispatch({ type: actions.EDIT_POST, newPost });
      });
  }

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        loading: state.loading,
        postsWithLoading: state.postsWithLoading,
        getPosts,
        editPost,
        deletePost: () => {},
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { PostProvider, PostContext };
