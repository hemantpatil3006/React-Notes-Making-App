import React, { useState } from 'react';
import styles from './Note.module.css';
import axios from 'axios';
import API_URL from '../utils/apiConfig';
import ConfirmationModal from './ConfirmationModal';
import { toast } from 'react-toastify';

const Note = ({ note, fetchNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getAuthHeaders = () => {
    return { headers: { Authorization: localStorage.getItem('token') } };
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${API_URL}/notes/${note._id}`, { content: editedContent }, getAuthHeaders());
      toast.success("Note updated");
      fetchNotes(note.groupId);
      setIsEditing(false);
    } catch (error) {
      console.error('Edit failed:', error);
      toast.error("Failed to update note");
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/notes/${note._id}`, getAuthHeaders());
      toast.success("Note deleted");
      fetchNotes(note.groupId);
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error("Failed to delete note");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString).toLocaleDateString(undefined, options);
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = new Date(dateString).toLocaleTimeString(undefined, timeOptions);
    return `${date} • ${time}`;
  };

  return (
    <>
    <div className={styles.note} style={{ opacity: isDeleting ? 0.5 : 1 }}>
      {isEditing ? (
        <div className={styles['note-edit-mode']}>
          <textarea
            className={styles['note-textarea']}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
          />
          <div className={styles['note-actions']} style={{ justifyContent: 'flex-end' }}>
             <button 
                className={`${styles['action-btn']} ${styles['cancel-edit-btn']}`}
                onClick={() => setIsEditing(false)}
             >
                Cancel
             </button>
             <button 
                className={`${styles['action-btn']} ${styles['save-edit-btn']}`}
                onClick={handleEdit}
                disabled={!editedContent.trim()}
             >
                Save
             </button>
          </div>
        </div>
      ) : (
        <div>
          <p className={styles['note-content']}>
              {note.content}
          </p>
          
          <div className={styles['note-footer']}>
            <span className={styles['note-date']}>
                {formatDate(note.createdAt)}
            </span>
            
            <div className={styles['note-actions']}>
                {/* DELETE BUTTON */}
                <button 
                    className={`${styles['action-btn']} ${styles['note-delete-btn']}`}
                    onClick={handleDeleteClick}
                    disabled={isDeleting}
                    aria-label="Delete note"
                >
                    Delete
                </button>

                {/* EDIT BUTTON */}
                <button 
                    className={`${styles['action-btn']} ${styles['note-edit-btn']}`}
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit note"
                >
                    Edit
                </button>
            </div>
          </div>
        </div>
      )}
    </div>

    {showDeleteModal && (
        <ConfirmationModal 
            message="Are you sure you want to delete this note?"
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
            isLoading={isDeleting}
        />
    )}
    </>
  );
};

export default Note;