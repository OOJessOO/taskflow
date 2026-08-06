# 🚀 Déploiement gratuit de TaskFlow

TaskFlow est une application full-stack : **frontend React (Vite)** + **backend Express** + **base de données PostgreSQL**.

| Partie | Service | Coût |
|---|---|---|
| Frontend | [Vercel](https://vercel.com) | Gratuit |
| Backend | [Render](https://render.com) | Gratuit |
| Base de données | [Neon](https://neon.tech) (PostgreSQL) | Gratuit |

> Le déploiement GitHub Pages existant (`.github/workflows`) ne suffit pas : il ne sert que du statique, sans backend ni base de données. Vous pouvez le supprimer ou l'ignorer.

---

## 1. Prérequis

- Compte [GitHub](https://github.com) (déjà configuré : repo `OOJessOO/taskflow`)
- Compte [Vercel](https://vercel.com)
- Compte [Render](https://render.com)
- Compte [Neon](https://neon.tech)

⚠️ **Avant de commencer** : le repo racine `OOJessOO/taskflow` contient des modifications non commitées. Poussez-les d'abord :

```bash
git add -A
git commit -m "chore: préparation déploiement"
git push origin main
```

> Les dossiers `taskflow-frontend/` et `taskflow-backend/` contiennent leurs propres `.git`. **Ignorez-les** : c'est le repo racine qui est déployé.

---

## 2. Base de données — Neon

1. Créez un projet sur [Neon](https://neon.tech) (plan gratuit).
2. Dans le projet, allez dans **Connection Details** → **Pooled connection** (ou **Direct**).
3. Copiez la **connection string** qui ressemble à :
   ```
   postgresql://neondb_owner:xxxx@ep-xxxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```
   Gardez-la, elle servira à l'étape suivante.

> Les tables (`users`, `lists`, `tasks`) seront créées automatiquement au premier démarrage du backend (Sequelize `sync()`).

---

## 3. Backend — Render

**Option A — via le dashboard (recommandée) :**

1. [Dashboard Render](https://dashboard.render.com) → **New +** → **Web Service**.
2. Connectez votre compte GitHub et choisissez le repo `OOJessOO/taskflow`.
3. Configurez :
   - **Root Directory** : `taskflow-backend`
   - **Runtime** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Instance Type** : Free
4. Dans **Environment**, ajoutez :
   | Key | Value |
   |---|---|
   | `DATABASE_URL` | la connection string Neon de l'étape 2 |
   | `JWT_SECRET` | une longue chaîne aléatoire (ex. `openssl rand -hex 32`) |
   | `JWT_EXPIRES_IN` | `7d` |
   | `NODE_VERSION` | `22.20.0` |
5. Cliquez sur **Create Web Service**. Le déploiement prend 2 à 5 minutes.
6. Vérifiez : ouvrez `https://taskflow-api.onrender.com/` → vous devez voir `{ "message": "TaskFlow API — en ligne." }`.
7. Notez votre URL finale : `https://taskflow-api.onrender.com`.

**Option B — via le Blueprint :** poussez `render.yaml` (déjà créé) sur GitHub puis, dans Render, **New + → Blueprint** et sélectionnez le repo. Vous devrez ensuite remplir la valeur de `DATABASE_URL` dans les variables du service.

---

## 4. Frontend — Vercel

1. [Vercel Dashboard](https://vercel.com) → **Add New** → **Project**.
2. Importez le repo GitHub `OOJessOO/taskflow`.
3. Configurez :
   - **Root Directory** : `taskflow-frontend`
   - **Framework Preset** : `Vite` (détecté automatiquement)
4. Dans **Environment Variables**, ajoutez :
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://taskflow-api.onrender.com/api` |
5. Cliquez sur **Deploy**. En 1 à 2 minutes, vous obtenez une URL du type `https://taskflow.vercel.app`.

Le fichier `vercel.json` (déjà créé) assure le routage React Router en production.

---

## 5. Vérification finale

1. Ouvrez l'URL Vercel du frontend.
2. Créez un compte, connectez-vous, créez des listes et des tâches.
3. Actualisez : tout doit persister (données en base).

---

## 6. Limitations du plan gratuit (à connaître)

- **Render (free)** : le backend **s'endort après ~15 min sans trafic** et met quelques secondes à se réveiller à la première requête.
- **Render (free)** : le système de fichiers est éphémère → les **avatars** uploadés sont perdus à chaque redéploiement. Les données restent sûres (en base). Pour persister les images, il faudrait un stockage objet (Cloudinary, S3…) — non inclus.
- **Vercel / Neon** : pas de limite de temps, parfaitement gratuits.

---

## 7. Mettre à jour après une modification

Rien de spécial : poussez sur `main`, Render et Vercel redéploient automatiquement (autoDeploy activé).

---

## 8. Variables d'environnement — récapitulatif

| Où | Variables |
|---|---|
| **Neon** | (fourni par Neon) |
| **Render** | `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `NODE_VERSION` |
| **Vercel** | `VITE_API_URL` |
