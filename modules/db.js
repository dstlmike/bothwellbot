var db_config   = require('../config/db-config.js');
var mongoDB     = require('mongodb').MongoClient;
var db_table = {}; //var db = require('mongodb').Db
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00.esmha.mongodb.net:27017,cluster0-shard-00-01.esmha.mongodb.net:27017,cluster0-shard-00-02.esmha.mongodb.net:27017/?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
////  connection_string;
/*= 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;*/
//}
//connect();
//getAllDocuments();
//connect(client); //.catch(console.error);
const {MongoClient} = require('mongodb');

main().catch(console.error);

async function main(){

    /**

     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.

     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details

     */

    const uri = 'mongodb://alexbot:308boonave@cluster0-shard-00-00.esmha.mongodb.net:27017,cluster0-shard-00-01.esmha.mongodb.net:27017,cluster0-shard-00-02.esmha.mongodb.net:27017/?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

 //

    const client = new MongoClient(uri);

 

    try {

        // Connect to the MongoDB cluster

        await client.connect();

 

        // Make the appropriate DB calls

        await  listDatabases(client);
await listCollections(client);
 await nocuments(client);
 console.log(client);
    } catch (e) {

        console.error(e);

    } finally {

      //  await client.close();

    }

}

//main().catch(console.error);

async function listDatabases(client){

    databasesList = await client.db().admin().listDatabases();
//databasesList = await client.db().admin().('listDatabases');
// var 

    console.log("Databases:");
//databasesList.databases.toArray(db => callback (db)); console.log(db); //console.log(` - ${db.name}`));

    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

};

async function listCollections(client, db_table){
var db_table = {};
var db_config   = require('../config/db-config.js');

     const dbo = await client.db('sampledb').collection('rooms'); //.listCollections();

   //  dbo.toArray(function(err, items) {
      //  console.log(items)
            //and u can loop over items to fetch the names
         //   client.close();


   // });
  //  collectionsList = await client.db().admin().listCollections();

//databasesList = await client.db().admin().('listDatabases');

 

    console.log("Collections:");

    //collectionsList
  dbo.find().forEach(dbo => console.log(` - ${dbo.name}`));

};

function connect(collection, callback){
 mongoDB.connect('mongodb://alexbot:308boonave@cluster0-shard-00-00.esmha.mongodb.net:27017,cluster0-shard-00-01.esmha.mongodb.net:27017,cluster0-shard-00-02.esmha.mongodb.net:27017/?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', function(err, results) {
    if(err) throw err;
   
   callback(results);
   // callback(db);
    console.log('Test: ' + '\n' + results);
 // });
//  const uri = 'mongodb://alexbot:308boonave@cluster0-shard-00-00.esmha.mongodb.net:27017,cluster0-shard-00-01.esmha.mongodb.net:27017,cluster0-shard-00-02.esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

 //

   // const client = new MongoClient(uri);

 

   // try {

        // Connect to the MongoDB cluster

      //  await client.connect();

//await callback(db);
//await console.log(db);
        // Make the appropriate DB calls

       // await  listDatabases(client);

//await listCollections(client);

// await nocuments(client);

   // } catch (e) {

     //   console.error(e);

   // } finally {

      //  await client.close();

    });
};

async function nocuments(client) {
//  mongoDB.connect('mongodb://alexbot:308boonave@cluster0-shard-00-00.esmha.mongodb.net:27017,cluster0-shard-00-01.esmha.mongodb.net:27017,cluster0-shard-00-02.esmha.mongodb.net:27017/sampledb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', function(err, db) {
  //  if(err) throw err;
    //var ret = [];
 /* var list = {
    "name": dbo.name,
    "id": dbo.id,
    "config": dbo.config
    }*/
 var dbo = await client.db('sampledb').collection('rooms'); //.listCollections();
//dbo.find({"name": 1}); //, function(err, cursor){

  //  dbo.find().toArray(function(err, results) {;
// return results;
// var dboo = 
  dbo.find().toArray(function(err, results){
 //  cursor.toArray(callback); //if (result) console.log(result); //.find().forEach(dbo => console.log(` Name: ${dbo.name}` + `\n` + ` Id: ${dbo.id}`));
console.log(results);
         //  dboo;                                   });                                  // console.log(dboo); //JSON.stringify(dbo));
}); //   db.close();
//});
  };
//dboo;
  //  dbo.find().forEach(dbo => (console.log(` Name: ${dbo.name}` + `\n` + ` Id: ${dbo.id}`));
  //  var allDocs = db.collection(collection).find().toArray(function(err, docs) {
    //  callback(docs);
      //db.close();
  //  });
 // });
//};

function getAllDocuments(collection, callback) {
  mongoDB.connect(connection_string, function(err, db) {
    if(err) throw err;
    var allDocs = db.collection(collection).find().toArray(function(err, cursor) {
      callback(cursor);
      console.log(cursor);
      db.close();
    });
  });
}

exports.getAllDocuments = getAllDocuments;

exports.addDoc = function(collection, doc, callback) {
  connect(function(db){
    var ret = db.collection(collection).insert(doc, function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
}

exports.updateOneDoc = function(collection, findJson, updateJson, callback) {
  connect(function(db){
    var ret = db.collection(collection).updateOne(findJson, updateJson, function(err, result) {
      if (callback)
        callback(result);
      db.close();
    })
  });
}

exports.removeOneDoc = function(collection, findJson, callback) {
  connect(function(db){
    var ret = db.collection(collection).deleteOne(findJson, function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
}

exports.addMod = function(mod, callback) {
  mongoDB.connect(connection_string, function(err, db) {
    if(err) throw err;
    var allDocs = db.collection(db_config.mods_table).insert(mod, function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
};

exports.addSysTrigger = function(trigger, callback) {
  mongoDB.connect(connection_string, function(err, db) {
    if(err) throw err;
    var allDocs = db.collection(db_config.system_triggers_table).insert(trigger, function(err, result){
      if (callback)
        callback(result);
      db.close();
    });
  });
};

exports.updateSysTrigger = function(trigger, callback) {
  mongoDB.connect(connection_string, function(err, db){
    if(err) throw err;
    db.collection(db_config.system_triggers_table).updateOne({"name" : trigger["name"]}, {
      $set: { "description": trigger["description"] }
    }, function(err, result) {
      if (callback)
        callback(results);
      db.close();
    });
  });
}

exports.getMods = function(callback) {
  getAllDocuments(db_config.mods_table, callback);
};

exports.getSysTriggers = function(callback) {
  getAllDocuments(db_config.system_triggers_table, callback);
};

exports.getApiTriggers = function(callback) {
  getAllDocuments(db_config.api_triggers_table, callback);
};

exports.findMod = function(mod, callback) {
  mongoDB.connect(connection_string, function(err, db) {
    if(err) throw err;
    var allDocs = db.collection('mods').findOne({name: mod},function(err, docs){
      callback(docs);
    //  db.close();
    });
  });
};
