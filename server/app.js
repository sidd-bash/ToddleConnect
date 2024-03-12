import express from "express";
import {Server} from "socket.io";
import { createServer } from "http";
import bodyParser from 'body-parser';
// import cors from "cors";
// import pkg from "./db.js"
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express()

const PORT = 3000


const server = createServer(app);

const io = new Server(server,{
  cors:{
    origin:"*"
  }
})

// const pool = require('./db');
import dotenv from "dotenv"
dotenv.config()
// require('dotenv').config();
import pkg from "pg"
const { Pool } = pkg
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
  }; 
const secretKey = process.env.JWT_SECRET;
const pool = new Pool(config);

app.use(bodyParser.json()); // Parses JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cors({
  origin:'http://localhost:3001'
}))
  

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Search for a user by keyword (first name or last name)
app.get('/api/users/search/:keyword', async (req, res) => {
  const { keyword } = req.params;
  // Implement the SQL query to search for users by first name or last name
  const result = await pool.query('SELECT * FROM users WHERE firstName ILIKE $1 OR lastName ILIKE $1', [`%${keyword}%`]);
  res.json(result.rows);
});

app.get('/api/users/search/', async (req, res) => { 
  // Implement the SQL query to search for users by first name or last name
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});


// Fetch all users who have messages with the given user
app.get('/api/users/:userId/contacts', async (req, res) => {
  const { userId } = req.params;
  // Implement the SQL query to fetch users with messages with the given user
  const result = await pool.query('SELECT DISTINCT u.* FROM users u JOIN messages m ON u.id = m.sender_id OR u.id = m.receiver_id WHERE m.sender_id = $1 OR m.receiver_id = $1', [userId]);
  res.json(result.rows);
}); 

// Fetch all messages between two users
app.get('/api/messages/:user1Id/:user2Id', async (req, res) => {
  const { user1Id, user2Id } = req.params;
  // Implement the SQL query to fetch messages between two users
  const result = await pool.query('SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY timestamp', [user1Id, user2Id]);
  res.json(result.rows);
});

// Create a new message between two users
app.post('/api/messages', async (req, res) => {
  console.log(req.body)
  const { senderId, receiverId, content } = req.body;
  // Implement the SQL query to insert a new message
  const result = await pool.query('INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *', [senderId, receiverId, content]);
  res.json(result.rows[0]); 
});

 
app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password, post } = req.body;
  
  // Validate user data (optional)
 
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query('INSERT INTO users (firstName, lastName, email, password, post) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, email, hashedPassword, post]);

    // **Optional (Immediate JWT after registration):**
    const token = jwt.sign({ userId: result.rows[0].id }, secretKey, { expiresIn: '1m' }); // Short-lived token for immediate login

    res.json({ token: token || null, user: result.rows[0] }); // Return user object and optional token
  } catch (error) {
    console.error('Error creating user:', error);
    // Handle potential errors 
    res.status(500).json({ message: 'Error creating user' });
  }
}); 

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Implement logic to retrieve user by email from database
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (!user.rows[0]) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare hashed password with provided password (use bcrypt.compare)
  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
   

  // Generate a JWT token on successful login
  const token = jwt.sign({ userId: user.rows[0].id }, secretKey, { expiresIn: '30m' }); // Adjust expiration time as needed

  res.json({ token, user: user.rows[0] });
});



  app.put('/api/users/:id', async (req, res) => {
    // console.log('this happened')
    const { id } = req.params;
    const { firstName, lastName, image } = req.body;
  
    // Validate user data (optional)
  
    try {
      const result = await pool.query(
        'UPDATE users SET firstName = $1, lastName = $2, image = $3 WHERE id = $4 RETURNING *',
        [firstName, lastName, image, id] // Pass image as well
      );
  
      if (result.rowCount > 0) {
        res.json({ user: result.rows[0] });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error editing user:', error);
      // Handle potential errors (e.g., database errors, invalid image format)
      res.status(500).json({ message: 'Error editing user' });
    }
  });

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