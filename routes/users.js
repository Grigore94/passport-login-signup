const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//user moddel
const User = require("../models/User");

//login
router.get("/login", (req, res) => res.render("login"));
//register
router.get("/register", (req, res) => res.render("register"));

//registerhandle
router.post("/register",( req, res) => {
    const {name, email, password, password2 } = req.body;
    let err = [];

    //required fields check
    if(!name || !email || !password || !password2 ) {
        error.push({msg: "Fill in all fields"});
    }
    //password match check
    if(password != password2 ) {
        error.push({ msg: "Password do not match"});
    }
    //password lenght check
    if(password.lenght < 6) {
        error.push({ msg: "Your password must be at least 6 carachters"});
    }
    if(error.length > 0 ){
res.render("register", {
    error,
    name,
    email,
    password,
    password2
})
    }else {
        //pass validation
           User.findOne({ email: email })
           .then(user => {
               if(user) {
                   error.push({ msg: "Email is already registered" });
                res.render("register", {
                    error,
                    name,
                    email,
                    password,
                    password2
               });
        
    }else {
const newUser = new User({
    name,
    email,
    password
});

//hash passwords
bcrypt.genSalt(10,(err,salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
if(err) throw err;
//password set to hash
newUser.password = hash;
//save user
newUser.save()
.then(user => {
    req.flash("success_msg", "You are now registered")
    res.redirect("/users/login");
})
.catch(err => console.log(err))
}));
    }
});

module.exports = router;