const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
function tokenForUser(user){
  const timestamp = new Date().getTime();
  //sub & iat are standard JWT params. More at jwt.io.
  return jwt.encode({sub:user.id, iat:timestamp}, config.secret);
}

exports.signin = function(req,res){
  //User has already had their email and password auth'd
  //We just need to give them a token.
  return res.send({token:tokenForUser(req.user),user:req.user});
}
exports.signup = function(req,res,next){
  //See if a user with the given email exists
const email = req.body.email; 
const password = req.body.password;
if(!email || !password){
  return res.status(422).send({error: 'You must provide email & password'});
}
  // If a user with email does exist, return an error
User.findOne({email:email}, function(err, existingUser){
if(err){return next(err);}
if(existingUser){
  return res.status(422).send({error: 'Email is in use'});
}

  //If a user with email does NOT exist, create and save user record
  const user = new User({
    email,
    password
  });
user.save(function(err){
  if(err){ return next(err);}
});
  //Respond to request indicating the user was created.
 return res.send({token:tokenForUser(user),user});
});

}
