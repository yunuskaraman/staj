const express = require('express');
const router = express.Router();

const adminlogin = require('../controllers/adminLogin');
const arastirmaci = require('../controllers/arastirmaci');
const tur = require('../controllers/tur');
const yayin = require('../controllers/yayin');

router.get('/giris',adminlogin.getGiris);
router.get('/arastirmaci',arastirmaci.getArastirmaci);
router.get('/tur',tur.getTur);
router.get('/yayin',yayin.getYayinEkle);

router.post('/tur',tur.postTur);
router.post('/yayin',yayin.postYayinEkle);
router.post('/arastirmaci',arastirmaci.postArastirmaci);
router.post('/giris',adminlogin.postGiris);

module.exports = router