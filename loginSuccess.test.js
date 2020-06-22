const expect = require('expect');
const retrieveLoginMessage = require('./retrieveLoginMessage');


test('identifiants et mot de passe incorrect', () => {
    return retrieveLoginMessage("antoine@gmail.com", "123soleil").then(message => {
        expect(message).toBe('Connexion réussie');
    });
});

