const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const no_chat = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    if (pathname === "/a") {
      app.render(req, res, "/a", query);
    } else if (pathname === "/b") {
      app.render(req, res, "/b", query);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  const io = require("socket.io")(no_chat, { cors: { origin: "*" } });

  io.on("connect", (socket) => {
    var userUID = socket.handshake.query.user;
    socket.join(userUID);
    socket.on("send-message", ({ recipient, message }) => {
      const currentDateValue = new Date().toUTCString();
      const messagetoSend = {
        message,
        from: userUID,
        to: recipient,
        receiveTimeVal: currentDateValue,
      };

      socket.broadcast.to(recipient).emit("receive-message", messagetoSend);
      socket.emit("receive-message", messagetoSend);
    });
  });

  const port = process.env.PORT || 3000;
  no_chat.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on port ${port}`);
  });
});
