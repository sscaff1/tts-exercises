import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  input: {
    display: 'block',
  },
};

function PostEditForm({
  title,
  description,
  onEditPost,
  onCancel,
  onChangeTitle,
  onChangeDescription,
}) {
  return (
    <form onSubmit={onEditPost}>
      <input
        style={styles.input}
        type="text"
        value={title}
        onChange={onChangeTitle}
      />
      <textarea
        style={styles.input}
        onChange={onChangeDescription}
        value={description}
      />
      <div>
        <button type="submit">Edit Post</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PostEditForm;
