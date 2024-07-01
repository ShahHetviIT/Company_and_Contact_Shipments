const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    contactName: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    contactType: {
      type: String,
      enum: ["Primary", "Secondary", "Other"],
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
