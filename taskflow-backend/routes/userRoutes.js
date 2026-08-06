const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');
const { uploadAvatar } = require('../middlewares/upload');
const { updateAvatar, updateProfile } = require('../controllers/userController');
router.put('/avatar', requireAuth, uploadAvatar.single('avatar'), updateAvatar);
router.put('/me', requireAuth, updateProfile);
module.exports = router;