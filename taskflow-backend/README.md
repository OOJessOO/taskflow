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

## Codes d'erreur

Les réponses d'erreur renvoient un champ `code` stable (pas de message localisé), traduit côté frontend selon la langue active :

```
REGISTER_FIELDS_REQUIRED, EMAIL_TAKEN, LOGIN_FIELDS_REQUIRED, INVALID_CREDENTIALS,
LIST_TITLE_REQUIRED, LIST_NOT_FOUND, LIST_DELETED,
TASK_FIELDS_REQUIRED, TASK_NOT_FOUND, TASK_DELETED,
NO_FILE_UPLOADED, EMAIL_ALREADY_USED, PASSWORD_TOO_SHORT, UNSUPPORTED_FILE_FORMAT,
AUTH_REQUIRED, USER_NOT_FOUND, INVALID_TOKEN, VALIDATION_ERROR, INTERNAL_ERROR
```

Exemple de réponse d'erreur :
```json
{ "code": "INVALID_CREDENTIALS" }
```
