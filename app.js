const express = require("express");
const expressLayouts =  require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

//dbconfig
const db = require("./config/keys").mongoURI;

//connect mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDb Connected"))
.catch(err => console.log(err) );

//ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

//bodyparser
app.use(express.urlencoded({ extended: true }));

//express session midleware
app.use(session({
    secret: "keybord cat",
    resave: true,
    saveUninitialized: true
}));

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash('error');
    next();
})

//routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));