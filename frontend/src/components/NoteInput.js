import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/apiConfig';
import { IoMdSend } from "react-icons/io"; 
import { toast } from 'react-toastify';
// Standard CSS used

const NoteInput = ({ groupId, fetchNotes }) => {
  const [noteContent, setNoteContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/notes`, 
        { groupId, content: noteContent },
        { headers: { Authorization: token } }
      );
      setNoteContent('');
      fetchNotes(groupId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create note");
    } finally {
      setIsLoading(false);
    }
  };

  const isActive = noteContent.trim().length > 0;

  return (
    <div className='input-container'>
        <form 
            className="note-input-form" 
            onSubmit={handleSend} 
        >
            <textarea
                placeholder="Enter your text here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                disabled={isLoading}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                    }
                }}
            />
            
            <button
                type="submit"
                disabled={!isActive || isLoading}
                className={`send-btn-icon ${isActive ? 'active' : ''}`}
            >
                <IoMdSend 
                    size={28} 
                    color={isActive ? "#001F8B" : "#ABABAB"} 
                />
            </button>
        </form>
    </div>
  );
};

export default NoteInput;