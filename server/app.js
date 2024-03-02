import express from "express";
import {Server} from "socket.io";
import { createServer } from "http";
import cors from 'cors';
const app = express()

const PORT = 3000


const server = createServer(app);

const io = new Server(server,{
  cors:{
    origin:"*"
  }
})

io.on('connection',(socket) => {
  console.log("User Connected",socket.id);
  socket.broadcast.emit("welcome","welcome to the server! " + socket.id)

  socket.on("message",data=>{
    socket.broadcast.emit("message-recieved",data)
  })  
   
})
server.listen(PORT,()=>{ 
  console.log("Listening at port: ",PORT)
})