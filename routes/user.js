const express = require("express");
const router = express.Router();
const Authentication = require('../controllers/authentication.js');
const auth = require('../middlewares/passport-strategies');
router.post('/signup', Authentication.signup);
router.post('/signin', auth.requireSignin, Authentication.signin);
router.get('/me', auth.requireAuth, function (req, res) {
res.send(req.user);
  
});


module.exports = router;