const db = require('../models/db');


exports.getArastirmaci = (req, res, next) => {

 

  var arastirmaciBilgiler = [] ;
  var yayinBilgiler = [] ;

  const session = db.driver.session();
  session
    .run(`MATCH (a:Arastirmaci) RETURN a`)
    .then(function (result) {
      result.records.forEach(function (record) {
        arastirmaciBilgiler.push(record._fields[0].properties);
        //arastirmaciBilgiler.adi = record._fields[0].properties.adi_soyadi;
        //console.log(arastirmaciBilgiler);
      });
        session
        .run(`MATCH (a:Yayin) RETURN a`)
        .then(function (result) {
          result.records.forEach(function (record) {
            yayinBilgiler.push(record._fields[0].properties);
            
          });
           res.render('arastirmaci', { title: 'Araştırmacı Sayfası', arastirmaciBilgiler:arastirmaciBilgiler, yayinBilgiler:yayinBilgiler});
        }
        );
    }
     
    );

   

}

exports.postArastirmaci = (req, res, next) => {

  const arastirmaci_id = req.body.arastirmaci_id;
  const arastirmaci_adi = req.body.arastirmaci_adi;
  const yayin_id = req.body.yayin_id;

  const session = db.driver.session();
  session
    .run(`MATCH (a:Arastirmaci) RETURN a`)
    .then(function (result) {
      
      result.records.forEach(function (record) {
        if(record._fields[0].properties.arastirmaci_id == arastirmaci_id){
          try {
            const writeQuery2 = `MATCH (a:Arastirmaci {arastirmaci_id:$arastirmaci_id} ), (m:Yayin {yayin_id: $yayin_id}) create (a) - [:yayin] -> (m)`
        
            const writeResult = session.writeTransaction(tx =>
              tx.run(writeQuery2, { arastirmaci_id, yayin_id })
            );
            console.log(writeResult);
          } catch (error) {
            console.error('Something went wrong: ', error)
          }
          
        }
        else{
          try {
            const writeQuery = `MERGE (y1:Arastirmaci {arastirmaci_id: $arastirmaci_id, adi_soyadi: $arastirmaci_adi})
                                MERGE (y2:Yayin { yayin_id: $yayin_id })
                                MERGE (y1)-[:yayin]->(y2)
                                RETURN y1, y2`
        
            const writeResult = session.writeTransaction(tx =>
              tx.run(writeQuery, { arastirmaci_id, arastirmaci_adi, yayin_id })
            );
          } catch (error) {
            console.error('Something went wrong: ', error)
          }
         
        }

      })
    }

    );


  res.redirect('/');

}
