require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const listRoutes = require('./routes/listRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// --- Middlewares globaux ---
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);

// --- Routes ---
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API — en ligne.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tasks', taskRoutes);

// 404 pour les routes non définies
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée.' });
});

// Gestion centralisée des erreurs (toujours en dernier)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à PostgreSQL établie.');

    // En développement : synchronise les modèles avec la base.
    // En production, utiliser des migrations plutôt que sync().
    await sequelize.sync();
    console.log('Modèles synchronisés avec la base de données.');

    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Impossible de démarrer le serveur :', error);
    process.exit(1);
  }
}

startServer();
