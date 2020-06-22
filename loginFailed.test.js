const expect = require('expect');
const retrieveLoginMessage = require('./retrieveLoginMessage');


test('identifiants et mot de passe incorrect', () => {
    return retrieveLoginMessage("julien@gmail.com", "obelix").then(message => {
        expect(message).toBe('Identifiants incorrects');
    });
});

