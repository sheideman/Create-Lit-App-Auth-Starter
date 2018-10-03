
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({  
  email: {
  type: String,
  unique: true,
},
password: String,
updated: { type: Date, default: Date.now },
created: { type: Date, default: Date.now },
userType: {type:String, default: 'user', enum: ['user', 'admin']}
});

//On Save Hook, encrypt password
//Before saving model, run this function
userSchema.pre('save', function(next){
  //Instance of user model is this context.
  const user = this;
  //Generate a salt then run callback

  //Hash (encrypt) password using the salt
  bcrypt.genSalt(10, function(err,salt){
    if(err){ return next(err);}

    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){ return next(err);}


      //overwrite plain text password with encrypted password.
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){return callback(err);}
    callback(null, isMatch);
  });
}
const ModelClass = mongoose.model('user', userSchema);
module.exports = ModelClass;