import React, { useEffect, useReducer } from 'react';
import PostList from './PostList';
import './App.css';

const BASE_URL = 'http://jsonplaceholder.typicode.com';

const initialState = {
  loading: true,
  posts: [],
  postsWithLoading: [],
};

const listOfActions = {
  START_FETCH: 'START_FETCHING_POSTS',
  FINISH_FETCH: 'FINISH_FETCHING_POSTS',
  DELETE_POST: 'DELETE_POST',
  EDIT_POST: 'EDIT_POST',
  TOGGLE_POST_LOADING: 'TOGGLE_POST_LOADING',
  UPDATE_POST: 'UPDATE_POST',
};

function reducer(state, action) {
  switch (action.type) {
    case listOfActions.START_FETCH:
      return initialState;
    case listOfActions.FINISH_FETCH:
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };
    case listOfActions.DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(post => post.id !== action.id),
      };
    case listOfActions.TOGGLE_POST_LOADING:
      return {
        ...state,
        postsWithLoading: state.postsWithLoading.includes(action.id)
          ? state.postsWithLoading
          : state.postsWithLoading.concat(action.id),
      };
    case listOfActions.UPDATE_POST:
      console.log(action.newPost);
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
    default:
      return state;
  }
}

function editPost(postId, userId, title, body) {
  return fetch(`${BASE_URL}/posts/${postId}`, {
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
  }).then(response => response.json());
}

function App({ match }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const endpoint = match.params.userId
      ? `posts?userId=${match.params.userId}`
      : 'posts';
    dispatch({ type: listOfActions.START_FETCH });
    fetch(`${BASE_URL}/${endpoint}`)
      .then(resp => resp.json())
      .then(posts => {
        // do something
        dispatch({ type: listOfActions.FINISH_FETCH, posts });
      });
  }, [match.params.userId]);
  return (
    <PostList
      loading={state.loading}
      posts={state.posts}
      postsWithLoading={state.postsWithLoading}
      onEdit={(post, title, description) => {
        dispatch({
          type: listOfActions.TOGGLE_POST_LOADING,
          id: post.id,
        });
        editPost(post.id, post.userId, title, description).then(newPost => {
          dispatch({ type: listOfActions.UPDATE_POST, newPost });
        });
      }}
      onDelete={post =>
        dispatch({ type: listOfActions.DELETE_POST, id: post.id })
      }
      userId={match.params.userId}
    />
  );
}

export default App;
