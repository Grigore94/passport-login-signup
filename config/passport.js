const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcryp = require("bcrypyjs");

//bring in user model 
const User = require("../models/User");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//see if user matches
User.findOne({ email: email})
.then(user => {
    if(!user) {
        return done(null,false,{ message: "This Email is not regestered"});
    }
    //matching password
    bcrypt.compare(password, user.password, (err, isMatch) => {
if(err) throw err;
if(isMatch) {
    return done(null, user);
}else{
    return done(null, false, { message: "Password incorect"});
}
    })
})
.catch(err => console.log(err))
        })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

};