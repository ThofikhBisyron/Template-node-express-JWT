const { createUser, getUserByEmail } = require('../models/user');
const { generateToken } = require('../services/jwtService');
const bcrypt = require('bcryptjs');

const registerOrLogin = async (req, res) => {
    console.log(req.body)
  const { email, password } = req.body;

  try {
    let user = await getUserByEmail(email);

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await createUser(email, hashedPassword)
    }

    const token = generateToken(user.id);

    res.status(200).json({
      message: 'Register or Login Succesfully',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal Server Error'})
  }
};

module.exports = { registerOrLogin };
