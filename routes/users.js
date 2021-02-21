const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//user moddel
const User = require("../models/User");

//login
router.get("/login", (req, res) => res.render("login"));
//register
router.get("/register", (req, res) => res.render("register"));

//register handle
router.post("/register",( req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //required fields check
    if(!name || !email || !password || !password2 ) {
        errors.push({ msg: "Fill in all fields"});
    }
    //password match check
    if(password != password2 ) {
        errors.push({ msg: "Password do not match"});
    }
    //password lenght check
    if(password.length < 6) {
        errors.push({ msg: "Your password must be at least 6 carachters"});
    }
    if(errors.length > 0 ){
res.render("register", {
    errors,
    name,
    email,
    password,
    password2
})
    }else {
        //pass validation
           User.findOne({ email: email }).then(user => {
               if(user) {
                errors.push({ msg: "Email is already registered" });
                res.render("register", {
                   errors,
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
bcrypt.genSalt(10, (err, salt) => {
bcrypt.hash(newUser.password, salt, (err, hash) => {
    if(err) throw err;
    newUser.password = hash;
    newUser 
    .save()
    .then(user => {
        req.flash("success_msg", "You are now registered");
        res.redirect("/users/login");
    }).catch( err => console.log(err));
})
})
} 
    });
}
});


module.exports = router;