const db = require('../models/db');

exports.getYayinlar = (req,res,next) => {

  var yayinBilgiler = [];

  const session = db.driver.session();
  session
    .run(`MATCH (y:Yayin) RETURN y;`)
    .then(function (result) {
      result.records.forEach(function (record) {
        yayinBilgiler.push(record._fields[0].properties);

      });
      
      res.render('index',{title:'Anasayfa',yayinBilgiler:yayinBilgiler});
    }
     
    );
   
}

exports.getYayinEkle = (req,res,next) => {

  var yayinBilgiler = [];
  var turBilgiler = [];

  const session = db.driver.session();
  session
    .run(`MATCH (a:Yayin) RETURN a`)
    .then(function (result) {
      result.records.forEach(function (record) {
        yayinBilgiler.push(record._fields[0].properties);
        //arastirmaciBilgiler.adi = record._fields[0].properties.adi_soyadi;
        //console.log(arastirmaciBilgiler);
      });
        session
        .run(`MATCH (a:Tur) RETURN a`)
        .then(function (result) {
          result.records.forEach(function (record) {
            turBilgiler.push(record._fields[0].properties);
            
          });
           res.render('yayin', { title: 'Araştırmacı Sayfası', yayinBilgiler:yayinBilgiler, turBilgiler:turBilgiler});
        }
        );
    }
     
    );
    
}

exports.postYayinEkle = (req,res,next) => {

    const yayin_id = req.body.yayin_id;
    const yayin_adi = req.body.yayin_adi;
    const yil = req.body.yil;
    const yer = req.body.yer;
    const tur_id = req.body.tur_id;

    const session = db.driver.session();


    try {
      
      const writeQuery = `MERGE (y1:Yayin {yayin_id: $yayin_id, yayin_adi: $yayin_adi, yil: $yil, yer: $yer })
                          MERGE (y2:Tur { tur_id: $tur_id })
                          MERGE (y1)-[:Tur]->(y2)
                          RETURN y1, y2`;
    
      // Write transactions allow the driver to handle retries and transient errors
      const writeResult = session.writeTransaction(tx =>
        tx.run(writeQuery, {yayin_id, yayin_adi, yil,yer,tur_id })
      );
      
      console.log(writeResult);
    
      /*
      writeResult.records.forEach(record => {
        const person1Node = record.get('p1')
        const person2Node = record.get('p2')
        console.log(
          `Created friendship between: ${person1Node.properties.name}, ${person2Node.properties.name}`
        )
      })
      */
     
    } catch (error) {
      console.error('Something went wrong: ', error)
    } 

    console.log(yayin_id);

    res.redirect('/');
}

exports.postYayinlar = (req,res,next) => {

  const arastirmaci_adi = req.body.arastirmaci_adi;
  const yayin_adi = req.body.yayin_adi;
  const yayin_yili = req.body.yayin_yili
  const yayinBilgiler = [];
  console.log(arastirmaci_adi);
  const session = db.driver.session();

  if(arastirmaci_adi.length!=0 && yayin_adi.length==0 && yayin_yili.length==0){
    session
    .run(`MATCH (a:Arastirmaci {adi_soyadi:"${arastirmaci_adi}" })-[:yayin]->(yayin) RETURN yayin`)
    .then(function (result) {
      result.records.forEach(function (record) {
        yayinBilgiler.push(record._fields[0].properties);
        
      });
      console.log(yayinBilgiler);
      res.render('index',{title:'Anasayfa',yayinBilgiler:yayinBilgiler, arastirmaci:arastirmaci_adi});
    }
     
    );
  }

  if(yayin_adi.length != 0){
    session
    .run(`MATCH (y:Yayin) WHERE y.yayin_adi = "${yayin_adi}" RETURN y;`)
    .then(function (result) {
      result.records.forEach(function (record) {
        yayinBilgiler.push(record._fields[0].properties);
        
      });
      console.log(yayinBilgiler);
      res.render('index',{title:'Anasayfa',yayinBilgiler:yayinBilgiler});
    }
     
    );
  }

  if(arastirmaci_adi.length==0 && yayin_adi.length==0 && yayin_yili.length != 0){
    session
    .run(`MATCH (y:Yayin) WHERE y.yil = "${yayin_yili}" RETURN y;`)
    .then(function (result) {
      result.records.forEach(function (record) {
        yayinBilgiler.push(record._fields[0].properties);
        
      });
      console.log(yayinBilgiler);
      res.render('index',{title:'Anasayfa',yayinBilgiler:yayinBilgiler});
    }
     
    );
  }
}