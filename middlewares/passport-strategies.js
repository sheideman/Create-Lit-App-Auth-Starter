const Authentication = require('../controllers/authentication.js');
const passportService = require('../services/passport.js');
const passport = require('passport');


exports.requireSignin = passport.authenticate('local', {session:false});
exports.requireAuth = passport.authenticate('jwt', {session:false});
