import React, { useState } from "react";
import "./NoteGroup.css";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal";

const NoteGroup = ({ group, onSelect, selectedGroup, deleteGroup }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getGroupInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteGroup(group._id);
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setShowConfirmationModal(false);
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirmationModal(true);
  };

  return (
    <div
      className={`note-group ${selectedGroup?._id === group._id ? 'selected' : ''}`}
      onClick={onSelect}
      role="button"
      aria-label={`Select group ${group.name}`}
      style={{
        opacity: isDeleting ? 0.7 : 1,
        position: 'relative'
      }}
    >
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flex: 1 }}>
        
        <div style={{ backgroundColor: group.color }} className="group-initials">
          {getGroupInitials(group.name)}
        </div>
        
        <div className="group-name">{group.name}</div>
      </div>
      
      <div 
         onClick={handleDeleteClick}
         role="button"
         aria-label={`Delete group ${group.name}`}
         style={{ padding: '8px', zIndex: 10, display: 'flex', alignItems: 'center' }}
      >
        <DeleteIcon
          color="red"
          size={20}
          style={{ cursor: isDeleting ? "not-allowed" : "pointer" }}
        />
      </div>
      
      {showConfirmationModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete "${group.name}"?`}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirm}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default NoteGroup;