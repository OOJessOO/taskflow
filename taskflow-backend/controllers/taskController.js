const { Task, List } = require('../models');

// GET /api/tasks?listId=&status=&priority=&search=
async function getTasks(req, res, next) {
  try {
    const { listId, status, priority, search } = req.query;

    const where = { userId: req.user.id };
    if (listId) where.listId = listId;
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const { Op } = require('sequelize');
    if (search) {
      where.title = { [Op.iLike]: `%${search}%` };
    }

    const tasks = await Task.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json({ tasks });
  } catch (error) {
    next(error);
  }
}

// POST /api/tasks
async function createTask(req, res, next) {
  try {
    const { title, description, dueDate, priority, status, listId } = req.body;

    if (!title || !listId) {
      return res.status(400).json({ message: 'Le titre et la liste sont requis.' });
    }

    // Vérifie que la liste appartient bien à l'utilisateur
    const list = await List.findOne({ where: { id: listId, userId: req.user.id } });
    if (!list) {
      return res.status(404).json({ message: 'Liste introuvable.' });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      listId,
      userId: req.user.id,
    });

    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
}

// PUT /api/tasks/:id
async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, status, listId } = req.body;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Tâche introuvable.' });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.priority = priority ?? task.priority;
    task.status = status ?? task.status;
    task.listId = listId ?? task.listId;

    await task.save();
    res.json({ task });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/tasks/:id
async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Tâche introuvable.' });
    }

    await task.destroy();
    res.json({ message: 'Tâche supprimée.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
