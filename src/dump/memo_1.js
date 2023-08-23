console.log(req.body);
// var stack
if (!req.body) {
  const net = require("net");

  const SERVERPORT = process.env.PORT || 4500;

  const handleListening = (SERVERPORT) =>
    console.log(
      `✅ Server listenting on port http://localhost:${SERVERPORT} 🚀`
    );

  var server = net.createServer((socket) => {
    var message = [];

    console.log("Client connection");

    socket.on("data", (data) => {
      message = data.toString();
      console.log("on data");
      console.log(message);

      // socket.write(html);
    });
    server.on("end", () => {
      console.log("Client disconnected");
    });
  });

  server.listen(SERVERPORT, handleListening(SERVERPORT));
}
