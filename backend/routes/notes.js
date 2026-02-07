const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const noteController = require("../controllers/noteController");

// Apply auth middleware
router.use(authMiddleware);

router.post("/", noteController.createNote);
router.get("/:groupId", noteController.getNotes);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;