const fs = require('fs');
const path = require('path');
const { User } = require('../models');
const bcrypt = require('bcrypt');

async function updateAvatar(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ code: 'NO_FILE_UPLOADED' });
    }

    const user = await User.findByPk(req.user.id);

    if (user.avatarUrl) {
      const oldPath = path.join(__dirname, '..', user.avatarUrl.replace(/^\//, ''));
      fs.unlink(oldPath, () => {});
    }

    const relativeUrl = `/uploads/avatars/${req.file.filename}`;
    user.avatarUrl = relativeUrl;
    await user.save();

    res.json({ avatarUrl: relativeUrl });
  } catch (error) {
    next(error);
  }
}
async function updateProfile(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.user.id);

    if (email && email !== user.email) {
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(409).json({ code: 'EMAIL_ALREADY_USED' });
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ code: 'PASSWORD_TOO_SHORT' });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = { updateAvatar, updateProfile };