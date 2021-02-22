const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");


router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get("/dashbord", ensureAuthenticated, (req, res) => 
res.render("dashbord", {
    name: req.name
}));

module.exports = router;