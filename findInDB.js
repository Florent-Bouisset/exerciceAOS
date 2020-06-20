var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/loginAOS" // nom de la base de donnees



MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var dbo = db.db("loginAOS");
    var query = { email: "jean@gmail.com" }


    dbo.collection("utilisateurs").find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});