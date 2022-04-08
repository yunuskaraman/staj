const jwt = require('jsonwebtoken');
const utils =require('./utils');

exports.verifyToken = (req,res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', (err, authData) => {
            
            if(err){
                
                utils.returnResponse(res,403,err,null)
            }else{
                req.user = authData.kullanici;
                req.token = bearerToken;
                console.log("kullanıcı doğrulandı");
                next();
            }
        });

    }else{
        utils.returnResponse(res,400,'token bulunamadı',null);
    }
}
