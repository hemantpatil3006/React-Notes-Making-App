const Note = require("../models/Note");
const Group = require("../models/Group");

exports.createNote = async (req, res) => {
  try {
    const { groupId, content } = req.body;
    
    // Verify group belongs to user
    const group = await Group.findOne({ _id: groupId, userId: req.user.id });
    if (!group) return res.status(403).json({ error: "Unauthorized access to group" });

    const note = new Note({ groupId, content });
    const saved = await note.save();
    res.status(201).send(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    // Verify group belongs to user
    const group = await Group.findOne({ _id: req.params.groupId, userId: req.user.id });
    if (!group) return res.status(403).json({ error: "Unauthorized access to group" });

    let query = { groupId: req.params.groupId };
    if (req.query.search) {
        query.content = { $regex: req.query.search, $options: "i" };
    }

    const notes = await Note.find(query);
    res.send(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    // Ideally we should check if the note belongs to a group owned by the user
    // For efficiency, we trust the ID but could join check. 
    // Secure approach: Check note -> group -> user
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    const group = await Group.findOne({ _id: note.groupId, userId: req.user.id });
    if (!group) return res.status(403).json({ error: "Unauthorized" });

    note.content = req.body.content;
    const updated = await note.save();
    res.send(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    const group = await Group.findOne({ _id: note.groupId, userId: req.user.id });
    if (!group) return res.status(403).json({ error: "Unauthorized" });

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};
