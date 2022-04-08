const  router = require('express').Router();
const user = require("../models/user");
const checkAuth = require('../controllers/check-auth');
const userAdd = require("../controllers/kayit");
const protected = require("../controllers/protected");


router.post('/user-add',userAdd.postUserAdd);
router.get('/user-listele',userAdd.getUserListele);
router.get('/protected',checkAuth.verifyToken,protected.getProtected);


module.exports = router;