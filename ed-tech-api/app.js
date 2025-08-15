const express = require('express');
const cors = require('cors'); // ✅ Add this
const cookieParser = require('cookie-parser');
const { initDb } = require('./models');
const indexRouter = require('./routes/index');
require('dotenv').config();

const app = express();

// ✅ Allow cross-origin requests with credentials (Development mode - allow all origins)
app.use(cors({
  origin: true, // Allow all origins for development
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', indexRouter);

initDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
