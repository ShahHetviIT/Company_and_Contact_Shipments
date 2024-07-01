const ContactModel = require("../models/ContactModel");

module.exports.addContacts = async (req, res, next) => {
  try {
    const contacts = req.body.contactData;
    console.log(contacts);

    if (!Array.isArray(contacts)) {
      return res.status(400).json({ msg: "Invalid data format. Expected an array of contacts." });
    }

    const createdContacts = await ContactModel.create(contacts);

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
