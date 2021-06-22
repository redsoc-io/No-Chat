import md5 from "md5";

var aes256 = require("aes256");

export default function (req, res) {
  res.setHeader("Content-Type", "text/plain");
  if (req.method === "POST") {
    const string = req.query.string || "--";
    try {
      const userData = JSON.parse(string);
      userData.uuid = aes256.encrypt(
        process.env.UUID_SECRET,
        JSON.stringify({
          email: userData.email,
          name: userData.name,
          unique: getUnique(),
        })
      );
      var encryptedPlainText = aes256.encrypt(
        process.env.ENCRYPT_SECRET,
        JSON.stringify(userData)
      );
      console.log(userData);
      res.send(encryptedPlainText);
    } catch (e) {
      console.log(e);
      res.send("Unable to process your request");
    }
  } else {
    res.send("Unable to process your request");
  }
}

function getUnique() {
  return (
    new Date().getTime().toString() +
    new Date().valueOf() +
    Math.floor(Math.random() * 27272727272727) +
    1
  );
}
