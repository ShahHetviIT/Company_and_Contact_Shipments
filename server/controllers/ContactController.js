const ContactModel = require("../models/ContactModel");

module.exports.addContacts = async (req, res, next) => {
  try {
    const contacts = req.body.contactData;

    console.log("Original array:", contacts);

    const updatedContacts = contacts.slice(0, -1).map(contact => ({
      ...contact,
      dateOfBirth: contact.dateOfBirth ? new Date(contact.dateOfBirth) : null
    }));

    console.log("New array without last entry:", updatedContacts);

    if (!Array.isArray(updatedContacts)) {
      return res.status(400).json({ msg: "Invalid data format. Expected an array of contacts." });
    }

    // first drop data then create so there will be no redudanat data
    await ContactModel.collection.drop();
    const createdContacts = await ContactModel.create(updatedContacts);

    if (createdContacts.length > 0) {
      return res.json({ success: true, msg: "Contacts added successfully.", contacts: createdContacts });
    } else {
      return res.json({ msg: "Failed to add contacts to the database" });
    }
  } catch (ex) {
    // Check if the error is a validation error 
    if (ex.name === 'ValidationError') {
      const errorMessages = Object.keys(ex.errors).map(field => ({
        field: field,
        message: ex.errors[field].message
      }));
      console.log("Validation errors:", errorMessages);
      return res.status(400).json({ msg: "Validation error", errors: errorMessages });
    } else {
      // Handle other types of errors
      console.error("Error:", ex);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
  
};

module.exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find().populate('companyId');
    return res.json(contacts);
  } catch (ex) {
    next(ex);
  }
};
