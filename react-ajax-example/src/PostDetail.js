import React, { useEffect, useState } from 'react';

const BASE_URL = 'http://jsonplaceholder.typicode.com';

function getPostDetail(id) {
  return fetch(`${BASE_URL}/posts/${id}`).then(resp => resp.json());
}

function getCommentsFromPostId(id) {
  return fetch(`${BASE_URL}/comments?postId=${id}`).then(resp => resp.json());
}

function PostDetail({ history, match }) {
  const [details, setDetails] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    Promise.all([
      getPostDetail(match.params.id),
      getCommentsFromPostId(match.params.id),
    ]).then(data => {
      const [postDetails, postComments] = data;
      setDetails(postDetails);
      setComments(postComments);
    });
  }, [match.params.id]);
  if (!details) {
    return 'Loading...';
  }
  return (
    <div>
      <h2>{details.title}</h2>
      <p>{details.body}</p>
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id}>
          <h4>
            {comment.name} ({comment.email})
          </h4>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostDetail;
