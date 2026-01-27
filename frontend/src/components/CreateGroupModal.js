import React, { useState } from "react";
import "./Modal.css";
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
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content create-group-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-header">Create New Group</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="groupName" className="form-label">Group Name</label>
            <input
              type="text"
              id="groupName"
              className="form-input"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pick a Group Color</label>
            <div className="color-container">
              {colors.map((c) => (
                <div
                  key={c}
                  className={`color-circle ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="modal-btn create-btn">Create</button>
          </div>

        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateGroupModal;
