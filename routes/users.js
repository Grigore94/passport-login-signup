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
        err.push({msg: "Fill in all fields"});
    }
    //password match check
    if(password != password2 ) {
        err.push({ msg: "Password do not match"});
    }
    //password lenght check
    if(password.lenght < 6) {
        err.push({ msg: "Your password must be at least 6 carachters"});
    }
    if(err.length > 0 ){
res.render("register", {
    err,
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
                   err.push({ msg: "Email is already registered" });
                res.render("register", {
                    err,
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
    res.redirect("./login");
})
.catch(err => console.log(err))
}))
    }
});

module.exports = router;