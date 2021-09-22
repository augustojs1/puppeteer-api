const fs = require('fs');

exports.createPuppeteerEvent = async (req, res) => {
    const data = JSON.stringify(req.body);

    fs.appendFile("UserEvents.txt", data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 

    console.log(req.body);
};
