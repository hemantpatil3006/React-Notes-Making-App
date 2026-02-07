const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const groupController = require("../controllers/groupController");

// Apply auth middleware to all routes
router.use(authMiddleware);

router.post("/", groupController.createGroup);
router.get("/", groupController.getGroups);
router.delete("/:id", groupController.deleteGroup);

module.exports = router;
