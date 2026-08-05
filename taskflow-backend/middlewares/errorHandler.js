/**
 * Middleware global de gestion des erreurs.
 * Placé en dernier dans server.js, il intercepte toutes les erreurs
 * passées via next(error) dans les contrôleurs.
 */
function errorHandler(err, req, res, next) {
  console.error(err);

  // Erreurs de validation Sequelize
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      message: 'Erreur de validation.',
      errors: err.errors.map((e) => e.message),
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Erreur interne du serveur.',
  });
}

module.exports = { errorHandler };
