const Websocket=require("ws")
const wss = new Websocket.Server({ port: 7071 });
const clients=new Map();

wss.on('connection', (ws) => {
  console.log(ws,"connection here:")
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color };

    clients.set(ws, metadata);
    ws.on('message', (messageAsString) => {
        const message = JSON.parse(messageAsString);
        console.log(message)
        console.log(clients.keys(),"client here:")
        const metadata = clients.get(ws);
  
        message.sender = metadata.id;
        message.color = metadata.color;
        const outbound = JSON.stringify(message);

        [...clients.keys()].forEach((client) => {
          client.send(outbound);
        });
      });
      ws.on("close", () => {
        clients.delete(ws);
      });
  });

//function for generating a unique Id
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  console.log("wss up");
    