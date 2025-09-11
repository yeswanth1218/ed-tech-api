const { registerSchema, loginSchema ,logoutSchema} = require('../validations/auth');
const { register, login } = require('../services/auth');
const {checkAndSetJobForCompletion,removeKeyAfterCompletion,checkAndSetRedishKeyForLogin} =require('../config/common')
const CryptoJS =require('crypto-js')
// const redis_API_Request_Checker =require('../config/apiRedis')



const userRegistration = async (req, res) => {
  console.log(`>>>mains`)
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  if(req.body.role==="STUDENT" && !req.body.class){
   return res.status(400).json({ error: "class is required" });
  }
  try {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

    const newUser = await register(req.body.username, req.body.password, req.body.role,req.body.class,req.body.name);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userLogin = async (req, res) => {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const loginData = await login(req.body.username, req.body.password);
    res.status(200).json(loginData);
  } catch (err) {

    res.status(401).json({ error: err.message });
  }
};

// const userLogout = async (req, res) => {
//   try {
//     const { error } = logoutSchema.validate(req.body);
//     if (error) return res.status(400).json({ error: error.details[0].message });
//     console.log(`>>>>soaoa`)
//     const redisKey = `LOGIN:${req.body.userName}`;
  

//     // Compute the encrypted hash exactly as in checkAndSetJobForCompletion
//     const hash = CryptoJS.SHA256(JSON.stringify({ redisKey }));
//     const encryptedHash = hash.toString(CryptoJS.enc.Hex);

//     // Attempt to delete the key from Redis
//     const deletedCount = await removeKeyAfterCompletion(redisKey);

//     if (deletedCount && deletedCount > 0) {
//       return res.status(200).json({ success: true, message: 'Logout successful. Redis key removed.' });
//     } else {
//       // Key not found is still a successful, idempotent logout
//       return res.status(200).json({ success: true, message: 'Logout processed. No redis key found.' });
//     }
//   } catch (err) {
//     console.error('userLogout error:', err);
//     return res.status(500).json({ success: false, message: 'Internal server error during logout.' });
//   }
// };


module.exports = { userRegistration, userLogin };
