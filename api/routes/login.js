var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/loginAOS" // nom de la base de donnees
var dataBaseName = "loginAOS";
var collectionName = "utilisateurs";

async function isUserRegistered(email) {

    const client = await MongoClient.connect(url);
    const db = client.db(dataBaseName);
    const query = { "email": email };
    const result = await db.collection(collectionName).find(query).toArray();

    if (result.length > 0) {
        return true;
    }
    else {
        return false;
    }
};

async function emailAndPasswordMatch(email, password) {

    const client = await MongoClient.connect(url);
    const db = client.db(dataBaseName);
    const query = { "email": email };
    const result = await db.collection(collectionName).find(query).toArray();

    const userFound = result[0];
    if (userFound.password == password) {
        return true;
    }
    else {
        return false;
    }
}

async function login(email, password) {
    if (!await isUserRegistered(email)) {
        return false;
    }
    else {
        return await emailAndPasswordMatch(email, password);
    }
}


(async () => {
    console.log("test 1 " + await isUserRegistered("jean@gmail.com"));
    console.log("test 2 " + await emailAndPasswordMatch("jean@gmail.com", "123soleil"));
    console.log("test 3 " + await emailAndPasswordMatch("jean@gmail.com", "123sol"));
    console.log("test 4 " + await login("jean@gmail.com", "123sol"));
    console.log("test 5 " + await login("jean@gmail.com", "123soleil"));
    console.log("test 6 " + await login("pierre@gmail.com", "toto"));
})();


