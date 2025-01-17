const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CompanyRoutes = require("./routes/CompanyRoutes");
const ContactRoutes = require("./routes/ContactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config(); 

app.use("/api/company", CompanyRoutes); 
app.use("/api/contact", ContactRoutes); 

const PORT = process.env.PORT || 3001; 

const server = app.listen(PORT, () =>
  console.log(`Server started on ${PORT}`)
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error(err.message);
  });