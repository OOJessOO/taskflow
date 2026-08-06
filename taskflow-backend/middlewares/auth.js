const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Protège une route : vérifie le token JWT dans le header Authorization.
 * Si valide, attache l'utilisateur à req.user et laisse passer.
 */
async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ code: 'AUTH_REQUIRED' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(401).json({ code: 'USER_NOT_FOUND' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ code: 'INVALID_TOKEN' });
  }
}

module.exports = { requireAuth };
