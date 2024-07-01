const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
      default: "",
    },
    companyPhone: {
      type: String,
      default: "",
    },
    companyEmail: {
      type: String,
      default: "",
    },
    companyWebsite: {
      type: String,
      default: "",
    },
    numberOfEmployees: {
      type: Number,
      default: 0,
    },
    foundedDate: {
      type: Date,
      default: null,
    },
    industryType: {
      type: String,
      enum: ["Technology", "Finance", "Healthcare", "Retail", "Other"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);
