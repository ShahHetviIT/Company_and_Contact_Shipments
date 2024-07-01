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

    const createdContacts = await ContactModel.create(updatedContacts);

    if (createdContacts.length > 0) {
      return res.json({ success: true, msg: "Contacts added successfully.", contacts: createdContacts });
    } else {
      return res.json({ msg: "Failed to add contacts to the database" });
    }
  } catch (ex) {
    next(ex);
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
