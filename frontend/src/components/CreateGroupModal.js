import React, { useState } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import API_URL from "../utils/apiConfig";
import { toast } from 'react-toastify';
// Standard CSS used

const CreateGroupModal = ({ onClose, fetchGroups, onGroupsUpdate, groups }) => {
  const [groupName, setGroupName] = useState("");
  const [color, setColor] = useState("");

  const colors = [
  "#E57373", // soft red
  "#64B5F6", // light blue
  "#81C784", // fresh green
  "#FFD54F", // warm yellow
  "#BA68C8", // purple
  "#4DB6AC"  // teal
];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for duplicates
    if (groups && groups.some(g => g.name.trim().toLowerCase() === groupName.trim().toLowerCase())) {
      toast.error("A group with this name already exists.");
      return;
    }

    if (!color) {
      toast.error("Please select a color");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_URL}/groups`, 
        { name: groupName, color },
        { headers: { Authorization: token } }
      );
      
      toast.success("Group created!");
      if (onGroupsUpdate) {
        onGroupsUpdate(res.data);
      } else {
        fetchGroups();
      }
      onClose();
    } catch (error) {
      console.error("❌ Create failed:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || "Failed to create group.";
      toast.error(errorMessage);
    }
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles['modal-backdrop']} onClick={handleClose}>
      <div className={`${styles['modal-content']} ${styles['create-group-modal']}`} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles['modal-header']}>Create New Group</h2>
        <form onSubmit={handleSubmit}>
          
          <div className={styles['form-group']}>
            <label htmlFor="groupName" className={styles['form-label']}>Group Name</label>
            <input
              type="text"
              id="groupName"
              className={styles['form-input']}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              required
              autoFocus
            />
          </div>

          <div className={styles['form-group']}>
            <label className={styles['form-label']}>Pick a Group Color</label>
            <div className={styles['color-container']}>
              {colors.map((c) => (
                <div
                  key={c}
                  className={`${styles['color-circle']} ${color === c ? styles.selected : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className={styles['modal-actions']}>
            <button type="submit" className={`${styles['modal-btn']} ${styles['create-btn']}`}>Create</button>
          </div>

        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateGroupModal;
