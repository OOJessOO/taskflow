# TaskFlow — Backend

API REST en Node.js / Express, architecture MVC, base de données PostgreSQL (Sequelize), authentification JWT.

## Installation

```bash
npm install
```

Copie `.env.example` en `.env` et renseigne tes propres identifiants PostgreSQL :

```bash
cp .env.example .env
```

Crée la base de données PostgreSQL (une seule fois) :

```bash
createdb taskflow
```

## Lancer le serveur

```bash
npm run dev     # avec rechargement automatique (nodemon)
npm start        # sans rechargement
```

Au démarrage, Sequelize synchronise automatiquement les tables (`users`, `lists`, `tasks`) avec la base.

## Structure (MVC)

```
config/         → connexion PostgreSQL
models/         → User, List, Task + associations
controllers/    → logique métier
routes/         → définition des endpoints
middlewares/    → auth JWT, gestion des erreurs
utils/          → génération de tokens
server.js       → point d'entrée
```

## Endpoints principaux

| Méthode | Route | Protégée | Description |
|---|---|---|---|
| POST | /api/auth/register | non | Créer un compte |
| POST | /api/auth/login | non | Se connecter |
| GET | /api/auth/me | oui | Infos utilisateur connecté |
| GET | /api/lists | oui | Lister mes listes |
| POST | /api/lists | oui | Créer une liste |
| PUT | /api/lists/:id | oui | Modifier une liste |
| DELETE | /api/lists/:id | oui | Supprimer une liste |
| GET | /api/tasks | oui | Lister mes tâches (filtres : listId, status, priority, search) |
| POST | /api/tasks | oui | Créer une tâche |
| PUT | /api/tasks/:id | oui | Modifier une tâche |
| DELETE | /api/tasks/:id | oui | Supprimer une tâche |

Pour les routes protégées, ajouter le header :
```
Authorization: Bearer <token>
```
