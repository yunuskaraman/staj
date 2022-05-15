const db = require('../models/db');

var message = "";

exports.getGiris = (req,res,next) => {

    res.render('giris',{title:'Giris Sayfası',path:'/giris',message:message});
}

exports.postGiris = (req,res,next) => {

    const kullanici_adi = req.body.kullanici_adi;
    const sifre = req.body.sifre;
    
    const session = db.driver.session();
    session
        .run(`MATCH (admin:Admin {kullanici_adi:"${kullanici_adi}"}) RETURN admin`)
        .then(function(result)
        {
            if(result.records.length==0){
                console.log('Böyle bir kullanıcı bulunamadı.');
                message = "Kullanıcı Bulunamadı";
                res.render('giris',{title:'Giriş',path:'/giris',message:message});
            }
            result.records.forEach(function(record){
                console.log(record._fields[0].identity.low);
                
                if(record._fields[0].properties.sifre==sifre){
                    console.log('Giriş Başarılı');
                    
                    res.redirect('/');
                }
                else{
                    message = "Şifre Yanlış";
                    res.render('giris',{title:'Giriş',path:'/giris',message:message});
                }
               record._fields[0].properties.kullanici_adi
            })
        }
        
        );
   
    

}


exports.getCikis = (req,res,next) => {
    
}

exports.postCikis = (req,res,next) => {
    
}

