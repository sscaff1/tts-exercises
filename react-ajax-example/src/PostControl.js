import React from 'react';
import PropTypes from 'prop-types';

function PostControl({ editMode, onEditClick, onDeleteClick }) {
  if (editMode) {
    return null;
  }
  return (
    <>
      <button type="button" onClick={onEditClick}>
        Edit
      </button>
      <button type="button" onClick={onDeleteClick}>
        Delete
      </button>
    </>
  );
}

PostControl.propTypes = {
  editMode: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default PostControl;
