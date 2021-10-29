// Require Express
const express = require("express");
// Require dotenv
const env = require('dotenv')
    // For avoiding cross error with frontend
const cors = require("cors");
// body parser
const bodyParser = require("body-parser");
// Database connection
const connect = require("../config/db")

// Object of Express
const app = express()
    // Acquire cors
app.use(cors())
    // for accessing json <data></data>
app.use(express.json());
// Body parser
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
// Config env for variables
env.config();

// port
const port = process.env.PORT || 4000;
// Connect Db
connect()

app.listen(port, () => {
    console.log("Eduance backend is running........");
})


// <------------------------------Routers--------------------------->
const student_auth_routes = require("./routers/student routers/authentication_router");

app.use("/student/auth/", student_auth_routes);


// <------------------------------Routers END--------------------------->