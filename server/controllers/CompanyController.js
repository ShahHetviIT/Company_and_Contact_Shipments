const CompanyModel = require("../models/CompanyModel");

module.exports.addCompanies = async (req, res, next) => {
  try {
    const companies = req.body.companyData;

    console.log("Original array:", companies);
    

    const updatedCompanies = companies.slice(0, -1); // Creates a new array without the last element

    const dateUpdated = updatedCompanies.map(company => ({
        ...company,
        foundedDate: company.foundedDate ? new Date(company.foundedDate) : null
      }));
  

    console.log("New array without last entry:", dateUpdated);
    console.log(dateUpdated);
    if (!Array.isArray(dateUpdated)) {
      return res
        .status(400)
        .json({ msg: "Invalid data format. Expected an array of companies." });
    }

    const createdCompanies = await CompanyModel.create(dateUpdated);

    if (createdCompanies.length > 0) {
      return res.json({
        success: true,
        msg: "Companies added successfully.",
        companies: createdCompanies,
      });
    } else {
      return res.json({ msg: "Failed to add companies to the database" });
    }
  } catch (ex) {
    console.log("error");
    next(ex);
  }
};

module.exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await CompanyModel.find();
    return res.json(companies);
  } catch (ex) {
    next(ex);
  }
};

