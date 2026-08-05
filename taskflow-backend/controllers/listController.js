const { List, Task } = require('../models');

// GET /api/lists
async function getLists(req, res, next) {
  try {
    const lists = await List.findAll({
      where: { userId: req.user.id },
      include: [{ model: Task }],
      order: [['createdAt', 'ASC']],
    });
    res.json({ lists });
  } catch (error) {
    next(error);
  }
}

// POST /api/lists
async function createList(req, res, next) {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Le titre de la liste est requis.' });
    }

    const list = await List.create({ title, userId: req.user.id });
    res.status(201).json({ list });
  } catch (error) {
    next(error);
  }
}

// PUT /api/lists/:id
async function updateList(req, res, next) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const list = await List.findOne({ where: { id, userId: req.user.id } });
    if (!list) {
      return res.status(404).json({ message: 'Liste introuvable.' });
    }

    list.title = title ?? list.title;
    await list.save();

    res.json({ list });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/lists/:id
async function deleteList(req, res, next) {
  try {
    const { id } = req.params;

    const list = await List.findOne({ where: { id, userId: req.user.id } });
    if (!list) {
      return res.status(404).json({ message: 'Liste introuvable.' });
    }

    await list.destroy();
    res.json({ message: 'Liste supprimée.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getLists, createList, updateList, deleteList };
