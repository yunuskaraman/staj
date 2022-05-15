const db = require('../models/db');

exports.getTur = (req,res,next) => {
    res.render('tur',{title:'Tur Sayfası'})
}

exports.postTur = (req,res,next) => {

    const tur_id = req.body.tur_id;
    const tur_adi = req.body.tur_adi;

    const session = db.driver.session();

  var soy = 'abc';
try {
  // To learn more about the Cypher syntax, see https://neo4j.com/docs/cypher-manual/current/
  // The Reference Card is also a good resource for keywords https://neo4j.com/docs/cypher-refcard/current/
  const writeQuery = `CREATE (t:Tur {tur_id: $tur_id, tur_adi: $tur_adi})`;

  // Write transactions allow the driver to handle retries and transient errors
  const writeResult = session.writeTransaction(tx =>
    tx.run(writeQuery, {tur_id,tur_adi})
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

    console.log(tur_adi);
    res.redirect('/');
}