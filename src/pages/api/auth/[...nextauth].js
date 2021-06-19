import NextAuth from "next-auth";
import Providers from "next-auth/providers";
var aes256 = require("aes256");
var md5 = require("md5");
const dev = process.env.NODE_ENV !== "production";

export default (req, res) =>
  NextAuth(req, res, {
    debug: dev,
    providers: [
      Providers.Credentials({
        name: "key",
        credentials: {
          key: {
            label: " ",
            type: "text",
            placeholder: "key",
            name: "key",
          },
        },
        async authorize(credentials, req) {
          const key = credentials.key;
          try {
            var cipher = aes256.createCipher(process.env.ENCRYPT_SECRET);
            var decryptedUser = JSON.parse(cipher.decrypt(key));
            const user = {
              name: decryptedUser.name,
              nickname: decryptedUser.nname,
              email: decryptedUser.email,
              image: `https://www.gravatar.com/avatar/${md5(
                decryptedUser.email
              )}`,
            };
            return user;
          } catch (e) {
            if (dev) console.log(e);
            return null;
          }
        },
      }),
    ],
    debug: true,
    secret: process.env.AUTH_SECRET,
    session: {
      jwt: {
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
      },
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  });