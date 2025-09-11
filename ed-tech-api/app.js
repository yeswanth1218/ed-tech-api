const express = require('express');
const cors = require('cors'); // ✅ Add this
const cookieParser = require('cookie-parser');
const { initDb } = require('./models');
const indexRouter = require('./routes/index');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://beyondgrades.ai"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', indexRouter);

initDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
