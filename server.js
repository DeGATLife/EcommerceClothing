const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors =require('cors');
const path =require('path');
var logger = require('morgan');
var port =process.env.PORT ;
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const mc = require('./DB/db');
app.get("/", (req, res) => {
    res.json({ message: "Welcome to shop application." });
  });



app.listen(port, () => {
    console.log("Server is running on port 4000.");
    
  });
  var useRoutes = require('./Routes/User.Routes'); //importing route
  useRoutes(app);
  var studentRoutes = require('./Routes/Student.Routes'); //importing route
  studentRoutes(app);