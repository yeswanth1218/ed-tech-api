// const dotenv = require('dotenv')
// const Redis = require('ioredis')

// dotenv.config();

// const redis = {
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379,
//   password: process.env.REDIS_PASSWORD || undefined, // 👈 add this
// }

// const redis_API_Request_Checker = new Redis(redis);

// redis_API_Request_Checker.on('connect', () => {
//   console.log('redis_API_Request_Checker Connected to Redis ❤❤❤, config/apiRedis.js');
// });
// redis_API_Request_Checker.on('error', (err) => {
//   console.error('redis_API_Request_Checker Error connecting to Redis: config/apiRedis.js', err);
// });

// module.exports = redis_API_Request_Checker;
