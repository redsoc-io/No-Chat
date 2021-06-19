var aes256 = require("aes256");

export default function (req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.send(decryptedPlainText);
}
