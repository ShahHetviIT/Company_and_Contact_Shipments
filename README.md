# MERN Stack Project Template

This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack application for managing company and contact data using CSV or Excel file uploads.

## Features

- Upload CSV or Excel files to add company and contact data to the database.
- View added companies and contacts in a tabular format.
- Error handling for validation errors during data upload.
- Cancel upload functionality to clear uploaded data.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Database**: MongoDB (Mongoose)


## Setup Instructions

### Prerequisites

- Node.js (with npm)
- MongoDB

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```
   
2. **Install dependencies**

   Install server dependencies:
   ```bash
   cd server
   npm install
   ```

   Install client dependencies:
   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables**

   ```bash
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```
   
4. **Start the development server**

   For Server:
   ```bash
   npm start
   ```

   For Client:
   ```bash
   npm start
   ```

5. **Access the application**

   Open your browser and go to http://localhost:3000 to view the application.

**Visit the project:** View the live demo of this application at [https://company-and-contact-shipments.vercel.app/](https://company-and-contact-shipments.vercel.app/)



