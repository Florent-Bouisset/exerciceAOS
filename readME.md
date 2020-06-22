Etape 1 - Creer la base de données:
ouvrir mongo.exe
saisir les commandes:
>use loginAOS
>db.utilisateurs.insertMany([{ email:"antoine@gmail.com", password:"123soleil" },{email :"jules@gmail.com", password:"asterix"}])

Etape 2 - Lancer le serveur
saisir les commandes:
> cd api
> npm start

Etape 3 - Lancer le client
saisir les commandes:
> cd client
> npm start
Si le navigateur ne se lance pas automatiquement, se connecter à l'url http://localhost:3000/

Etape 4 - Effectuer les tests
saisir la commande:
>npm run test