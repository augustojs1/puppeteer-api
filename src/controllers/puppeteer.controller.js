const puppeteerService = require("../service/puppeteer.service");

exports.createPuppeteerEvent = async (req, res) => {
  try {
    puppeteerService.saveScriptToFile(req.body);
    puppeteerService.puppeteerService(req.body);

    res.status(201).json({ success: true, message: "Sent to puppeteer" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.log(error.message);
  }
};
