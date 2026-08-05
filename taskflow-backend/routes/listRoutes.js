const express = require('express');
const router = express.Router();
const { getLists, createList, updateList, deleteList } = require('../controllers/listController');
const { requireAuth } = require('../middlewares/auth');

// Toutes les routes de ce fichier nécessitent d'être connecté
router.use(requireAuth);

router.get('/', getLists);
router.post('/', createList);
router.put('/:id', updateList);
router.delete('/:id', deleteList);

module.exports = router;
