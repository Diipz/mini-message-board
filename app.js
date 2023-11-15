const express = require("express")
const path = require("path");
const createError = require("http-errors");
const mongoose = require("mongoose");

//read .env file and make variables available in process.env object
require('dotenv').config();


//setup server
const app = express();


//connect to mongoDB 
const uri = process.env.MONGODB_URI

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connected")
  } catch (error) {
    console.error("error")
  }
}

connect();

//declare viariables to access each route
const indexRouter = require("./routes/index");
const newMessageRouter = require("./routes/new-message");


//"app.use" loads a function to be used as middleware


//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


//a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application
app.use(express.json());

//method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware
app.use(express.urlencoded({ extended: true }));

//express.static() is a function that takes a path, and returns a middleware that serves all files in that path to /. (If you wanted to prefix it with /public or whatever, you'd write app.use('/public', express.static(path.join(__dirname, 'public'))), where the first /public is the web path and the second is the filesystem path of the files being served)
app.use(express.static(path.join(__dirname, "public")));


//link each router to path - must be declared after other middleware if it contains other middleware
app.use("/", indexRouter);
app.use("/new", newMessageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(8080)

module.exports = app;