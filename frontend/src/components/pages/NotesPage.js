import React, { useState, useEffect, useCallback } from "react";
import NoteGroup from "../NoteGroup";
import Note from "../Note";
import CreateGroupModal from "../CreateGroupModal";
import NoteInput from "../NoteInput";
import axios from "axios";
import { IoIosSearch as Search, IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import FallbackPage from "./FallbackPage";

const NotesPage = () => {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showGroupSearch, setShowGroupSearch] = useState(false);
  const [groupSearchText, setGroupSearchText] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') {
      navigate('/login');
    }
  }, [navigate]);

  const getAuthHeaders = () => {
    return { headers: { Authorization: localStorage.getItem('token') } };
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // ✅ Fetch Groups with Server-Side Search
  const fetchGroups = useCallback(async (searchQuery = "") => {
    try {
      let url = "/api/groups";
      if (searchQuery.trim()) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
      }
      
      const response = await axios.get(url, getAuthHeaders());
      setGroups(response.data);
      
      // Only cache if no search (initial state)
      if (!searchQuery.trim()) {
        localStorage.setItem('notesGroups', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Groups fetch error:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error("Session expired, please login again");
        navigate('/login');
      } else if (!error.response) {
        toast.error("Cannot connect to server. Check your connection.");
      }
    }
  }, [navigate]);

  // ✅ Fetch Notes with Server-Side Search
  const fetchNotes = useCallback(async (groupId, searchQuery = "") => {
    if (!groupId) return;
    try {
      let url = `/api/notes/${groupId}`;
      if (searchQuery.trim()) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
      }
      const response = await axios.get(url, getAuthHeaders());
      setNotes(response.data);
    } catch (error) {
      console.error("Notes fetch error:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error("Session expired, please login again");
        navigate('/login');
      }
    }
  }, [navigate]);

  // Initial Load
  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]); // Initial fetch only

  // Debounced Group Search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGroups(groupSearchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [groupSearchText, fetchGroups]);

  // Debounced Note Search & Group Selection
  useEffect(() => {
    const timer = setTimeout(() => {
        if (selectedGroup) {
            fetchNotes(selectedGroup._id, searchText);
        }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText, selectedGroup, fetchNotes]);

  // Delete Group Handler
  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`/api/groups/${groupId}`, getAuthHeaders());
      toast.success("Group deleted successfully");
      
      if (selectedGroup && selectedGroup._id === groupId) {
        setSelectedGroup(null);
        setNotes([]);
      }
      fetchGroups(groupSearchText); // Refresh list
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete group");
    }
  };

  // New Group Handler
  const handleNewGroup = (newGroup) => {
    // Optimistically update or refresh
    fetchGroups(groupSearchText);
    setSelectedGroup(newGroup);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const toggleGroupSearch = () => {
    setShowGroupSearch(!showGroupSearch);
    if (!showGroupSearch) {
      setGroupSearchText("");
    }
  };

  return (
    <div className="notes-page">
      <div className={`sidebar ${selectedGroup ? 'hidden-on-mobile' : ''}`} style={{ position: 'relative' }}>
        {showGroupSearch ? (
          <>
            <form onSubmit={handleSearch} style={{ display: "flex" }}>
              <input
                type="text"
                className="search-input"
                value={groupSearchText}
                onChange={(e) => setGroupSearchText(e.target.value)}
              />
              <button
                type="submit"
                className="search-button"
                onClick={() => setGroupSearchText("")}
              >
                <Search />
              </button>
            </form>
            <button className="toggle-button" onClick={toggleGroupSearch}>Hide</button>
          </>
        ) : (
          <>
            <div className="sidebar-header" onClick={() => setSelectedGroup(null)}>Pocket Notes</div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="toggle-button" onClick={toggleGroupSearch}>Search</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
        
        <div className="sidebar-content">
          {groups.map((group) => (
            <NoteGroup
              key={group._id}
              group={group}
              selectedGroup={selectedGroup}
              deleteGroup={handleDeleteGroup}
              onSelect={() => {
                  setSelectedGroup(group);
                  setSearchText(""); // Reset note search when switching groups
              }}
            />
          ))}
        </div>
        
        <div className="sidebar-button-container">
          <button 
            className="add-group-btn" 
            onClick={() => setShowModal(true)}
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            +
          </button>
        </div>
      </div>

      <div className={`main-content ${!selectedGroup ? 'hidden-on-mobile' : ''}`}>
        {selectedGroup ? (
          <>
            <div className="note-header">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="back-icon" onClick={() => setSelectedGroup(null)}>
                  <IoMdArrowBack />
                </div>
                <span>{selectedGroup.name}</span>
              </div>
              <form onSubmit={handleSearch} style={{ display: "flex" }}>
                <input
                  type="text"
                  className="search-input"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search notes..."
                />
                <button className="search-button" type="submit" onClick={() => setSearchText("")}>
                  <Search />
                </button>
              </form>
            </div>
            
            <div className="notes-list">
              {notes.map((note) => (
                <Note key={note._id} note={note} fetchNotes={() => fetchNotes(selectedGroup._id, searchText)} />
              ))}
            </div>
            
            <NoteInput groupId={selectedGroup._id} fetchNotes={() => fetchNotes(selectedGroup._id, searchText)} />
          </>
        ) : (
          <FallbackPage />
        )}
      </div>

      {showModal && (
        <CreateGroupModal
          groups={groups}
          onClose={() => setShowModal(false)}
          onGroupsUpdate={handleNewGroup}
          fetchGroups={fetchGroups}
        />
      )}
    </div>
  );
};

export default NotesPage;