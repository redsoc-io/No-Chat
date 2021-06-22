import md5 from "md5";

var aes256 = require("aes256");

export default function (req, res) {
  res.setHeader("Content-Type", "text/plain");
  if (req.method === "POST") {
    const string = JSON.parse(req.body).string || "--";
    try {
      const uuid_cyper = aes256.createCipher(process.env.UUID_SECRET);
      const dec = uuid_cyper.decrypt(string);
      console.log(dec);
      const user = JSON.parse(dec);
      const userProfile = {
        exists: true,
        name: user.name,
        image: `https://www.gravatar.com/avatar/${md5(user.email)}`,
      };
      res.status(200).json(userProfile);
    } catch (e) {
      console.log(e);
      res.status(200).json({ exists: false });
    }
  } else {
    res.status(200).json({ exists: false });
  }
}
