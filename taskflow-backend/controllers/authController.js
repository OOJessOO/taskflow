const bcrypt = require('bcrypt');
const { User } = require('../models');
const { generateToken } = require('../utils/token');

const SALT_ROUNDS = 10;

// POST /api/auth/register
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nom, email et mot de passe sont requis.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Un compte existe déjà avec cet email.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user.id);

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const token = generateToken(user.id);

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/auth/me
async function getMe(req, res) {
  // req.user est déjà attaché par le middleware requireAuth
  res.json({ user: req.user });
}

module.exports = { register, login, getMe };
