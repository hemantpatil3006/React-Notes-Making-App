const Group = require("../models/Group");

exports.createGroup = async (req, res) => {
  try {
    const { name, color } = req.body;

    // Check if group with same name already exists for this user
    const existingGroup = await Group.findOne({ 
      userId: req.user.id, 
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") } 
    });

    if (existingGroup) {
      return res.status(400).json({ error: "A group with this name already exists." });
    }

    const group = new Group({ 
        name: name.trim(), 
        color,
        userId: req.user.id 
    });
    const saved = await group.save();
    res.status(201).send(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    let query = { userId: req.user.id };
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: "i" };
    }
    const groups = await Group.find(query);
    res.send(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!group) return res.status(404).json({ error: "Group not found or unauthorized" });
    
    // Optional: Delete associated notes (good practice)
    // await Note.deleteMany({ groupId: req.params.id }); 
    
    res.send({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
