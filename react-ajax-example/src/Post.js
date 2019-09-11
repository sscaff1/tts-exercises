import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PostControl from './PostControl';
import PostForm from './PostForm';
import postActions from './core/posts/actions';

const styles = {
  root: {
    border: '1px solid #000',
    padding: '10px 20px',
    borderRadius: 3,
    marginBottom: 10,
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
  },
  control: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  normal: {
    color: '#000',
    textDecoration: 'none',
  },
};

function Post({ id, title, description, userId, match }) {
  const [editMode, setEditMode] = useState(false);
  const [stateTitle, setStateTitle] = useState(title);
  const [stateDescription, setStateDescription] = useState(description);
  const dispatch = useDispatch();
  const toggleEditMode = () => setEditMode(e => !e);
  const onEditPost = e => {
    e.preventDefault();
    dispatch(postActions.editPost(id, userId, stateTitle, stateDescription));
  };
  const onEditCancel = e => {
    e.preventDefault();
    // reset our title and description back
    setStateTitle(title);
    setStateDescription(description);

    toggleEditMode();
  };
  return (
    <div style={styles.root}>
      <div style={styles.control}>
        <PostControl
          editMode={editMode}
          onDeleteClick={() => dispatch(postActions.deletePost(id))}
          onEditClick={toggleEditMode}
        />
      </div>
      {editMode ? (
        <PostForm
          title={stateTitle}
          description={stateDescription}
          onSubmit={onEditPost}
          onCancel={onEditCancel}
          onChangeTitle={e => setStateTitle(e.target.value)}
          onChangeDescription={e => setStateDescription(e.target.value)}
          submitLabel="Edit Post"
        />
      ) : (
        <>
          {!!match.params.userId ? null : (
            <Link to={`/user/${userId}/posts`}>Get posts from {userId}</Link>
          )}
          <Link style={styles.normal} to={`/posts/${id}`}>
            <h3>{stateTitle}</h3>
            <p>{stateDescription}</p>
          </Link>
        </>
      )}
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

const PostWithRouter = withRouter(Post);

export default PostWithRouter;
