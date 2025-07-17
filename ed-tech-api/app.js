const express = require('express');
const cors = require('cors'); // ✅ Add this
const cookieParser = require('cookie-parser');
const { initDb } = require('./models');
const authRoutes = require('./routes/auth.route');
require('dotenv').config();

const app = express();

// ✅ Allow cross-origin requests with credentials
app.use(cors({
  origin: 'http://localhost:3000', // replace with your React frontend URL
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);

initDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
