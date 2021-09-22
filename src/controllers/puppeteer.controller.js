const fs = require('fs');
const puppeteerService = require('../service/puppeteer.service');

exports.createPuppeteerEvent = async (req, res) => {
    // const userEvents = JSON.stringify(req.body);

    try {
        puppeteerService.puppeteerService(req.body);
        
        res.status(201).json({ success: true, message: "Sent to puppeteer", data: req.body })
        console.log(req.body);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
        console.log(error.message);
    }
};

// fs.appendFile("UserEvents.txt", `${data}|`, function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// }); 