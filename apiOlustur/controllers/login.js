const  router = require('express').Router();
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require ("./utils");

exports.postLogin = async (req,res,next) => {

    try{
        const kullanici = await user.findOne({username:req.body.username});

        !kullanici && res.status(400).json("Kullanıcı adı bulunamadı");

        const validPassword = await bcrypt.compare(
            req.body.password,
            kullanici.password
        );
        

        req.kullanici = kullanici;
       // console.log("kullanıcı",req.kullanici);
        
        !validPassword && res.status(400).json("Şifres Yanlış");
               
        jwt.sign({kullanici:kullanici}, 'secretkey', {expiresIn: '30m'}, (err,jwtToken) => {
            res.status(200).json({
                kullaniciId: kullanici.id,
                jwtToken
            });
        });

        

    }catch(err){
        res.status(500).json(err);
    }
    
}

exports.getProfil = async (req,res) => {

    console.log(req.kullanici);

    utils.returnResponse(res,200,null,req.user);
}

