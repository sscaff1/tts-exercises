import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PostControl from './PostControl';
import PostEditForm from './PostEditForm';

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
};

function Post({ title, description, userId, onEdit, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  const [stateTitle, setStateTitle] = useState(title);
  const [stateDescription, setStateDescription] = useState(description);

  const toggleEditMode = () => setEditMode(e => !e);
  const onEditPost = e => {
    e.preventDefault();
    // toggleEditMode();
    onEdit(stateTitle, stateDescription);
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
          onDeleteClick={onDelete}
          onEditClick={toggleEditMode}
        />
      </div>
      {editMode ? (
        <PostEditForm
          title={stateTitle}
          description={stateDescription}
          onEditPost={onEditPost}
          onCancel={onEditCancel}
          onChangeTitle={e => setStateTitle(e.target.value)}
          onChangeDescription={e => setStateDescription(e.target.value)}
        />
      ) : (
        <>
          <a href="#">Get posts from {userId}</a>
          <h3>{stateTitle}</h3>
          <p>{stateDescription}</p>
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

export default Post;
