const puppeteer = require('puppeteer');

async function retrieveLoginMessage(email, password) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.type('#email', email.toString());
    await page.type('#password', password.toString());
    await page.keyboard.press('Enter');

    await page.screenshot({ path: 'exemple.png' });
    let loginMessage = await page.evaluate(() => document.querySelector('#loginStatus').textContent);
    await browser.close();
    return loginMessage;

};

module.exports = retrieveLoginMessage;
