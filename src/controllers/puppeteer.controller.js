const puppeteerService = require("../service/puppeteer.service");
const saveScriptService = require("../service/savescript.service");

exports.createPuppeteerEvent = async (req, res) => {
  const { body } = req;

  if (!body) {
    throw new Error("Empty events!");
  }

  try {
    puppeteerService.puppeteerService(body);

    saveScriptService.saveScriptToFile(body);

    res.status(201).json({ success: true, message: "Sent to puppeteer" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.log(error.message);
  }
};
