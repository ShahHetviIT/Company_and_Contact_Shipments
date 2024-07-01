import React, { useState } from "react";
import Papa from "papaparse";
import "../css/HomePage.css";

export default function HomePage() {
  const [companyData, setCompanyData] = useState([]);
  const [contactData, setContactData] = useState([]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        if (type === "company") {
          setCompanyData(result.data);
        } else {
          setContactData(result.data);
        }
      },
    });
  };

  return (
    <div className="component1">
      <div className="upload-section">
        <div className="component2">
          <div>Company Model</div>
          <div className="inpBox">
            <input
              className="inp"
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(e, "company")}
            />
          </div>
        </div>
        <div className="component2">
          <div>Contact Model</div>
          <div className="inpBox">
            <input
              className="inp"
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(e, "contact")}
            />
          </div>
        </div>
      </div>
      <div className="table-section">
        {companyData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company Address</th>
                <th>Company Phone</th>
                <th>Company Email</th>
                <th>Company Website</th>
                <th>Number of Employees</th>
                <th>Founded Date</th>
                <th>Industry Type</th>
              </tr>
            </thead>
            <tbody>
              {companyData.map((row, index) => (
                <tr key={index}>
                  <td>{row["Company Name"]}</td>
                  <td>{row["Company Address"]}</td>
                  <td>{row["Company Phone"]}</td>
                  <td>{row["Company Email"]}</td>
                  <td>{row["Company Website"]}</td>
                  <td>{row["Number of Employees"]}</td>
                  <td>{row["Founded Date"]}</td>
                  <td>{row["Industry Type"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {contactData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Contact Name</th>
                <th>Contact Email</th>
                <th>Contact Phone</th>
                <th>Date of Birth</th>
                <th>Contact Type</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((row, index) => (
                <tr key={index}>
                  <td>{row["Contact Name"]}</td>
                  <td>{row["Contact Email"]}</td>
                  <td>{row["Contact Phone"]}</td>
                  <td>{row["Date of Birth"]}</td>
                  <td>{row["Contact Type"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
