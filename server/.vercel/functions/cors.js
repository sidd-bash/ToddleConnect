// .vercel/functions/cors.js
export default async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (adjust for security if needed)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Methods allowed by Socket.IO
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Headers allowed by Socket.IO
    res.status(200).json({ message: 'CORS enabled' });
  }
  