const express = require("express");
const router = express.Router();
const { addContacts, getContacts } = require("../controllers/ContactController");

// Contact routes
router.post("/addContactDetails", addContacts);
router.get("/addContactDetails", getContacts);

module.exports = router;
