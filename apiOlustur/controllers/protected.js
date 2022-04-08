const checkAuth = require("./check-auth");
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const utils = require('./utils');

exports.getProtected = async  (req,res) =>{

    try{
        //const kullaniciId = returnResponse(res,200,null,req.kullanici._id);
        res.status(200).json('Ürünler listelendi.'); 
    }catch(err){
        res.status(404).json(err);
    }
};
