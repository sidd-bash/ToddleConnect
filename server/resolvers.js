import jwt from 'jsonwebtoken';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv"
import bcrypt from 'bcrypt'
dotenv.config()


const config = {
  connectionString: "postgres://default:Qo32EJGwdSVI@ep-muddy-block-a48j712o-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
}
const pool = new Pool(config)

function verifyJwtToken(authToken, jwtSecret) {

  try {
    const decodedToken = jwt.verify(authToken, jwtSecret);

    return decodedToken;
  } catch (error) {
    console.error('Error verifying JWT token:', error);

    return null;
  }
}


const resolvers = {
  Query: {
    users: async (_, { keyword }, context) => {
      if (!context.authToken) {
        throw new Error("Unauthorized access. Please provide a valid authentication token.");
      }
      try {
        const decodedToken = verifyJwtToken(context.authToken, process.env.JWT_SECRET);
        if (!decodedToken || !decodedToken.email) {
          throw new Error("Invalid authentication token.");
        }
        const result = await pool.query('SELECT * FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1', [`%${keyword}%`]);
        return result.rows;
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    contacts: async (_, { userId }, context) => {
      if (!context.authToken) {
        throw new Error("Unauthorized access. Please provide a valid authentication token.");
      }
      try {
        const decodedToken = verifyJwtToken(context.authToken, process.env.JWT_SECRET);
        if (!decodedToken || !decodedToken.email) {
          throw new Error("Invalid authentication token.");
        }
        // Implement SQL query to fetch users with messages for the given user
        const result = await pool.query(
          'SELECT DISTINCT u.* FROM users u JOIN messages m ON u.id = m.sender_id OR u.id = m.receiver_id WHERE m.sender_id = $1 OR m.receiver_id = $1',
          [userId]
        );
        return result.rows;
      } catch (error) {
        throw new Error('Error fetching contacts');
      }
    },
    messages: async (_, { user1Id, user2Id }, context) => {
      if (!context.authToken) {
        throw new Error("Unauthorized access. Please provide a valid authentication token.");
      }
      try {
        const decodedToken = verifyJwtToken(context.authToken, process.env.JWT_SECRET);
        if (!decodedToken || !decodedToken.email) {
          throw new Error("Invalid authentication token.");
        }
        const result = await pool.query(
          'SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY timestamp',
          [user1Id, user2Id]
        );
        return result.rows;
      } catch (error) {
        throw new Error('Error fetching messages');
      }
    },
  },
  Mutation: {
    createUser: async (_, { first_name, last_name, email, password, post }) => {
      try {
        console.log(first_name, last_name, email, password, post)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        const result = await pool.query(
          'INSERT INTO users (first_name, last_name, email, password, post) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [first_name, last_name, email, hashedPassword, post]
        );

        const user = result.rows[0];
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '3h' });
        return { user, authToken: token };
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
      }
    },

    login: async (_, { email, password }) => {
      try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (!result.rows[0]) {
          throw new Error('Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(password, result.rows[0].password);

        if (!passwordMatch) {
          throw new Error('Invalid email or password');
        }

        const user = result.rows[0];
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '3h' });
        return { user, authToken: token };
      } catch (error) {
        throw new Error('Error logging in',error);
      }
    },
    updateUser: async (_, { id, first_name, last_name, image }, context) => {
      if (!context.authToken) {
        throw new Error("Unauthorized access. Please provide a valid authentication token.");
      }
      try {
        const decodedToken = verifyJwtToken(context.authToken, process.env.JWT_SECRET);
        if (!decodedToken || !decodedToken.email) {
          throw new Error("Invalid authentication token.");
        }

        const result = await pool.query(
          'UPDATE users SET first_name = $1, last_name = $2, image = $3 WHERE id = $4 RETURNING *',
          [first_name, last_name, image, id]
        );

        if (result.rowCount === 0) {
          throw new Error('User not found');
        }

        return result.rows[0];
      } catch (error) {
        throw new Error('Error updating user');
      }
    },
    createMessage: async (_, { sender_id, receiver_id, content }, context) => {
      if (!context.authToken) {
        throw new Error("Unauthorized access. Please provide a valid authentication token.");
      }
      try {
        const decodedToken = verifyJwtToken(context.authToken, process.env.JWT_SECRET);
        if (!decodedToken || !decodedToken.email) {
          throw new Error("Invalid authentication token.");
        }
        const result = await pool.query(
          'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
          [sender_id, receiver_id, content]
        );
        return result.rows[0];
      } catch (error) {
        throw new Error('Error creating message');
      }
    },
  },
};
export default resolvers;

