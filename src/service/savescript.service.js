const fs = require("fs");
const path = require("path");
const generateRandomString = require("../utils/GenerateRandomString");

exports.saveScriptToFile = async (userEvents) => {
  const randomString = generateRandomString.getRandomString();

  fs.writeFile(
    path.join(
      __dirname,
      "..",
      "database",
      `UserEventsScript-${randomString}.txt`
    ),
    JSON.stringify(userEvents),
    function (error) {
      if (error) throw new Error("Error writing to file");
      console.log("File saved into the database");
    }
  );
};
