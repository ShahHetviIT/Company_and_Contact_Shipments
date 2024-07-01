// import React, { useState } from "react";
// import Papa from "papaparse";
// import "../css/HomePage.css";
// import axios from "axios";
// import {
//   addCompanyDetailsRoute,
//   addContactDetailsRoute,
// } from "../utils/APIUtils";

// export default function HomePage() {
//   const [companyData, setCompanyData] = useState([]);
//   const [contactData, setContactData] = useState([]);

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     Papa.parse(file, {
//       header: true,
//       complete: (result) => {
//         if (type === "company") {
//           setCompanyData(result.data);
//         } else if (type === "contact") {
//           setContactData(result.data);
//         }
//       },
//     });
//   };

//   const handleUpload = async (event) => {
//     const companySuccess = await axios.post(addCompanyDetailsRoute, {
//       companyData,
//     });

//     const contatSuccess = await axios.post(addContactDetailsRoute, {
//       contactData,
//     });
//   };

//   const cancelUpload = ()=>{
//     setCompanyData("");
//     setContactData("");
//   }

//   return (
//     <div className="component1">
//       <div className="upload-section">
//         <div className="component2">
//           <div>Company Model</div>
//           <div className="inpBox">
//             <input
//               className="inp"
//               type="file"
//               accept=".csv"
//               onChange={(e) => handleFileChange(e, "company")}
//               value={companyData}
//             />
//           </div>
//         </div>
//         <div className="component2">
//           <div>Contact Model</div>
//           <div className="inpBox">
//             <input
//               className="inp"
//               type="file"
//               accept=".csv"
//               value={contactData}
//               onChange={(e) => handleFileChange(e, "contact")}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="table-section">
//         {companyData.length > 0 && (
//           <table>
//             <thead>
//               <tr>
//                 <th>Company Name</th>
//                 <th>Company Address</th>
//                 <th>Company Phone</th>
//                 <th>Company Email</th>
//                 <th>Company Website</th>
//                 <th>Number of Employees</th>
//                 <th>Founded Date</th>
//                 <th>Industry Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {companyData.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row["Company Name"]}</td>
//                   <td>{row["Company Address"]}</td>
//                   <td>{row["Company Phone"]}</td>
//                   <td>{row["Company Email"]}</td>
//                   <td>{row["Company Website"]}</td>
//                   <td>{row["Number of Employees"]}</td>
//                   <td>{row["Founded Date"]}</td>
//                   <td>{row["Industry Type"]}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {contactData.length > 0 && (
//           <table>
//             <thead>
//               <tr>
//                 <th>Contact Name</th>
//                 <th>Contact Email</th>
//                 <th>Contact Phone</th>
//                 <th>Date of Birth</th>
//                 <th>Contact Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contactData.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row["Contact Name"]}</td>
//                   <td>{row["Contact Email"]}</td>
//                   <td>{row["Contact Phone"]}</td>
//                   <td>{row["Date of Birth"]}</td>
//                   <td>{row["Contact Type"]}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {companyData.length > 0 && contactData.length > 0 && (
//           <div className="updateDatabase">
//             <button onClick={handleUpload}>Upload</button>
//             <button onClick={cancelUpload}>Cancel</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import {
  addCompanyDetailsRoute,
  addContactDetailsRoute,
} from "../utils/APIUtils";
import "../css/HomePage.css";
import * as XLSX from "xlsx";
import Papa from "papaparse";

export default function HomePage() {
  const [companyData, setCompanyData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [success, setSuccess] = useState([]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];

    // Check file type
    if (file.name.endsWith(".csv")) {
      // Handle CSV file
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          if (type === "company") {
            setCompanyData(result.data);
          } else if (type === "contact") {
            setContactData(result.data);
          }
        },
      });
    } else {
      // Handle Excel file (xls or xlsx)
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming the first sheet is used
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (type === "company") {
          setCompanyData(jsonData);
        } else if (type === "contact") {
          setContactData(jsonData);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleUpload = async () => {
    try {
      const companySuccess = await axios.post(addCompanyDetailsRoute, {
        companyData,
      });

      const contactSuccess = await axios.post(addContactDetailsRoute, {
        contactData,
      });

      // Handle success responses as needed
      console.log("Upload successful");
      alert("Data uploaded in db successfully");
    } catch (error) {
      alert("Data is Ivalid to upload");
      console.error("Error uploading data:", error);
      // Handle error responses
    }
  };

  const cancelUpload = () => {
    setCompanyData([]);
    setContactData([]);
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
              accept=".xls, .xlsx, .csv"
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
              accept=".xls, .xlsx, .csv"
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
                  <td>{row["companyName"]}</td>
                  <td>{row["companyAddress"]}</td>
                  <td>{row["companyPhone"]}</td>
                  <td>{row["companyEmail"]}</td>
                  <td>{row["companyWebsite"]}</td>
                  <td>{row["numberOfEmployees"]}</td>
                  <td>{row["foundedDate"]}</td>
                  <td>{row["industryType"]}</td>
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
                  <td>{row["contactName"]}</td>
                  <td>{row["contactEmail"]}</td>
                  <td>{row["contactPhone"]}</td>
                  <td>{row["dateOfBirth"]}</td>
                  <td>{row["contactType"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {companyData.length > 0 && contactData.length > 0 && (
          <div className="updateDatabase">
            <button onClick={handleUpload}>Upload</button>
            <button onClick={cancelUpload}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
