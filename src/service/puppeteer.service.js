const puppeteer = require('puppeteer');

exports.puppeteerService = async (userEvents) => {
    console.log(`Ações do usuário no Puppeteer: ${JSON.stringify(userEvents)}`);
}