const express = require("express");
const router = express.Router();
const {
  addCompanies,
  getCompanies,
} = require("../controllers/CompanyController");

// Company routes
router.post("/addCompayDetails", addCompanies);
router.get("/getCompayDetails", getCompanies);

module.exports = router;
