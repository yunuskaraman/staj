const express = require('express');

const router = express.Router();

const yayinlar = require('../controllers/yayin');

router.get('/',yayinlar.getYayinlar);

router.post('/',yayinlar.postYayinlar);

module.exports = router