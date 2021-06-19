var aes256 = require("aes256");

export default function (req, res) {
  res.setHeader("Content-Type", "text/plain");
  if (req.method === "POST") {
    const string = req.query.string || "--";
    var encryptedPlainText = aes256.encrypt(process.env.ENCRYPT_SECRET, string);
    res.send(encryptedPlainText);
  } else {
    res.send("Unable to process your request");
  }
}
