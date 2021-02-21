const express = require("express");
const router = express.Router();

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
        res.send("pass")
    }
});

module.exports = router;