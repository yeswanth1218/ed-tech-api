const { registerSchema, loginSchema } = require('../validations/auth');
const { register, login } = require('../services/auth');

const userRegistration = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

    const newUser = await register(req.body.username, req.body.password, req.body.role);

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
    const loginData = await login(req.body.username, req.body.password, res);
    res.status(200).json(loginData);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { userRegistration, userLogin };
