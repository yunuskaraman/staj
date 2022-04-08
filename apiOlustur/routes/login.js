const  router = require('express').Router();
const checkAuth = require('../controllers/check-auth');
const logins = require('../controllers/login');

router.post('/login',logins.postLogin);

router.post('/profil',checkAuth.verifyToken,logins.getProfil);

module.exports = router;