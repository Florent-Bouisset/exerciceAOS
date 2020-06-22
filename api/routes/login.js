var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var router = express.Router();

var url = "mongodb://localhost:27017/loginAOS" // nom de la base de donnees et port par defaut
var dataBaseName = "loginAOS";
var collectionName = "utilisateurs";

async function isUserRegistered(email) {

    const client = await MongoClient.connect(url);
    const db = client.db(dataBaseName);
    const query = { "email": email };
    const isFound = await db.collection(collectionName).findOne(query);

    return (isFound ? true : false)
};

async function emailAndPasswordMatch(email, password) {

    const client = await MongoClient.connect(url);
    const db = client.db(dataBaseName);
    const query = { "email": email };
    const userFound = await db.collection(collectionName).findOne(query);

    return (userFound.password == password ? true : false);
}

async function login(email, password) {
    if (!await isUserRegistered(email)) {
        return false;
    }
    else {
        return await emailAndPasswordMatch(email, password);
    }
}


router.post('/', function (req, res, next) {
    console.log(req.body);
    login(req.body.email, req.body.password)
        .then((credentialsMatches) => {
            if (credentialsMatches) {
                res.send({ divID: 'mainContent', text: '<h2 id="loginStatus">Connexion réussie</h2>' });
            }
            else {
                res.send({ divID: 'errorMessage', text: '<p id="loginStatus">Identifiants incorrects</p>' });
            }
        })
})


module.exports = router;

/*

TESTS

(async () => {
    console.log("test 1 " + await isUserRegistered("jean@gmail.com"));
    console.log("test 2 " + await emailAndPasswordMatch("jean@gmail.com", "123soleil"));
    console.log("test 3 " + await emailAndPasswordMatch("jean@gmail.com", "123sol"));
    console.log("test 4 " + await login("jean@gmail.com", "123sol"));
    console.log("test 5 " + await login("jean@gmail.com", "123soleil"));
    console.log("test 6 " + await login("pierre@gmail.com", "toto"));
})();

*/
