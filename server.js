// const { debug } = require('console');
import { createServer } from "http";
// const debug = require("debug")("node-angular");
import app from "./index.js";


const normalizePort = val => {
  var port = parseInt(val, 10);

  if(isNaN(port)){
    return val;
  }

  if(port >= 0){
    return port;
  }

  return false;
};


const onError = error => {
  if(error.syscall !== "listen"){
    throw error;
  }

  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  switch(error.code){
    case "EACCES":
      console.error(bind + " requires elevated privileges >>>>ARS>>> server.js:28");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use >>>ARS>>> server.js:32");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () =>{
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  // debug("Listening on :"+ bind);
};



const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);


