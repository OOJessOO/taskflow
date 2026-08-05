const sequelize = require('../config/database');
const User = require('./User');
const List = require('./List');
const Task = require('./Task');

// --- Associations ---

// Un utilisateur possède plusieurs listes
User.hasMany(List, { foreignKey: 'userId', onDelete: 'CASCADE' });
List.belongsTo(User, { foreignKey: 'userId' });

// Un utilisateur possède plusieurs tâches (accès direct, pratique pour les filtres globaux)
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Une liste possède plusieurs tâches
List.hasMany(Task, { foreignKey: 'listId', onDelete: 'CASCADE' });
Task.belongsTo(List, { foreignKey: 'listId' });

module.exports = { sequelize, User, List, Task };
