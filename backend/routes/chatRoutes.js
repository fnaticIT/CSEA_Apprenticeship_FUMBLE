const express = require("express");
const { delchat, accessChat, fetchChats, fetchChats2, createGroupChat, removeFromGroup, addToGroup, renameGroup } = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.route("/all").get(fetchChats2);
router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/del/:id").delete(delchat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd/:userId/:chatId").put(addToGroup);

module.exports = router;
