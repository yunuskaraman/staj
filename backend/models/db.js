const neo4j = require('neo4j-driver');
 
const uri = 'neo4j+s://8f6f876c.databases.neo4j.io:7687';
const user = 'neo4j';
const password = 'NNzQt4ltkUTXF0QLKjnm3-XttBGjDe1tLvdY9ErHF_M';

exports.driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
