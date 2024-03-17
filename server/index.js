import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors'
import {Server} from "socket.io";
import http from 'http';
import path from 'path';
// import { createServer } from "http";
// import { gql } from 'apollo-server-express';
import typeDefs from './typedefs.js';
import resolvers from './resolvers.js';
const app = express()
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,resolvers
})
async function startServer() {
    await server.start();
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data
    
    app.use(cors({ origin: 'http://localhost:3000' }));
    // app.use('/socket.io');

    app.use("/graphql", cors(), express.json(), expressMiddleware(server, {
        context: async ({ req }) => {
            const authHeader = req.headers.authorization;
            const authToken = authHeader ? authHeader.split(' ')[1] : null;
            // console.log('Auth Token:', authToken);
            return { authToken };
        }
    }));
    
    httpServer.listen(8000, () => console.log("Server started at port 8000"));
    }
          



// const server2 = createServer(app);

const io = new Server(httpServer,{
  cors:{
    origin:"http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on('connection',(socket) => {
    console.log("User Connected",socket.id);
    socket.broadcast.emit("welcome","welcome to the server! " + socket.id)
  
    socket.on("message",data=>{
      socket.broadcast.emit("message-recieved",data)
    })  
     
  })
// server2.listen(8000)

startServer();

