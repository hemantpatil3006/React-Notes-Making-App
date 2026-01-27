const express = require("express");
const router = express.Router();
const Group = require("../models/Group");
const authMiddleware = require("../middleware/authMiddleware");

// Apply auth middleware to all routes
router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const { name, color } = req.body;
    const group = new Group({ 
        name, 
        color,
        userId: req.user.id 
    });
    const saved = await group.save();
    res.status(201).send(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
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
});

router.delete("/:id", async (req, res) => {
  try {
    const group = await Group.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!group) return res.status(404).json({ error: "Group not found or unauthorized" });
    
    // Optional: Delete associated notes (good practice)
    // await Note.deleteMany({ groupId: req.params.id }); 
    
    res.send({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
