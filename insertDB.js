
var url = "mongodb://localhost:27017/loginAOS" // nom de la base de donnees
var MongoClient = require('mongodb').MongoClient;


MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var dbo = db.db("loginAOS");
    var myobj = { email: "jean@gmail.com", password: "123soleil" };
    dbo.collection("utilisateurs").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 user created");
        db.close()
    })
})

