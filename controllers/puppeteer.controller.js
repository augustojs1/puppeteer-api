exports.createPuppeteerEvent = async (req, res) => {
    console.log(req.body);
    res.status(200).json({ success: true, data: req.body });
};