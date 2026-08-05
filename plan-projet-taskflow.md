# TaskFlow — Application de gestion de tâches (Full-Stack)

## 1. Objectif du projet

Créer une application web permettant à un utilisateur de créer un compte, se connecter, et gérer ses tâches personnelles organisées en listes/projets (façon Trello/Todoist simplifié).

**Ce que ça doit prouver sur ton CV :**
- Tu sais construire une architecture front/back séparée (React + API REST)
- Tu maîtrises l'authentification sécurisée
- Tu sais modéliser et manipuler une base de données
- Tu sais gérer l'état d'une application React (au-delà du simple affichage)
- Tu sais déployer un projet réel

---

## 2. Concept fonctionnel

L'utilisateur crée un compte, se connecte, et arrive sur un tableau de bord où il peut :
- Créer des **listes** (ex : "Travail", "Perso", "Courses")
- Ajouter des **tâches** dans ces listes (titre, description, date d'échéance, priorité, statut)
- Déplacer une tâche entre listes (drag & drop) ou changer son statut (À faire / En cours / Terminé)
- Modifier, supprimer, marquer comme terminée une tâche
- Filtrer/rechercher ses tâches (par priorité, date, mot-clé)

---

## 3. Pages / écrans (React)

| # | Page | Contenu |
|---|------|---------|
| 1 | **Accueil / Landing** | Présentation rapide de l'app + boutons "Se connecter" / "S'inscrire" |
| 2 | **Inscription (Register)** | Formulaire nom, email, mot de passe |
| 3 | **Connexion (Login)** | Formulaire email, mot de passe |
| 4 | **Dashboard (protégée)** | Vue principale : listes + tâches, ajout rapide de tâche |
| 5 | **Détail d'une tâche (modal ou page)** | Édition complète : description, date, priorité, statut |
| 6 | **Profil utilisateur** | Modifier nom/email/mot de passe, déconnexion |
| 7 (optionnelle) | **404 / Erreur** | Page non trouvée |

→ **6 pages principales**, ce qui est un bon volume pour un projet CV : ni trop simple, ni ingérable seul.

---

## 4. Architecture technique

```
Frontend (React)          Backend (Node + Express)         Base de données
┌─────────────────┐       ┌──────────────────────┐         ┌──────────────┐
│  Composants UI    │ ---> │  Routes API REST       │ ---> │  MongoDB /    │
│  React Router      │ <--- │  Contrôleurs           │ <--- │  PostgreSQL   │
│  Context/State     │      │  Middlewares (auth)    │      │              │
│  Fetch/Axios        │      │  Modèles (Mongoose/    │      │              │
│                     │      │  Sequelize)            │      │              │
└─────────────────┘       └──────────────────────┘         └──────────────┘
        JWT stocké                JWT généré et vérifié
      (localStorage/cookie)         à chaque requête protégée
```

**Stack retenue (confirmée par toi) :**
- Frontend : HTML, CSS, JavaScript, React (+ React Router pour la navigation)
- Backend : Node.js, Express
- Base de données : **PostgreSQL** (via Sequelize)
- Authentification : JWT (JSON Web Token) + hash des mots de passe avec bcrypt
- Architecture backend : **MVC** (models / controllers / routes / middlewares)

---

## 4bis. Direction design — "Cahier de bord" (ledger analogique)

Objectif : éviter les trois looks par défaut de l'IA (fond crème + accent terracotta ; fond noir + accent acide ; broadsheet à filets fins). Concept retenu : esthétique de carnet de bord papier, exécutée numériquement.

**Palette :**
- `#DCD6C9` — pierre/papier grisé (fond)
- `#232733` — encre ardoise (texte principal)
- `#4A5D45` — mousse profonde (accent primaire, statut "en cours")
- `#C08A2E` — ocre (accent secondaire, priorité moyenne)
- `#8B3A3A` — brique éteinte (priorité haute)

**Typographie :**
- Display (titres) : **Petrona**
- Corps de texte : **Archivo**
- Utilitaire (dates, badges tampon) : **Courier Prime**

**Mise en page :** tâches en lignes de registre avec réglure fine (pas de cartes flottantes façon Trello), colonne "spine" verticale entre les listes.

**Élément signature :** badges de priorité façon tampon encreur (bord irrégulier, texte en angle) au lieu de pastilles colorées classiques.

---

## 4ter. Structure MVC

**Backend (Node/Express) :**
```
backend/
├── config/          → connexion PostgreSQL, variables d'env
├── models/          → User.js, List.js, Task.js (Sequelize)
├── controllers/      → userController.js, listController.js, taskController.js
├── routes/           → userRoutes.js, listRoutes.js, taskRoutes.js
├── middlewares/       → auth.js (vérification JWT), errorHandler.js
├── utils/             → helpers (hash, tokens...)
└── server.js
```

**Frontend (React) — séparation des responsabilités inspirée du MVC :**
```
frontend/
├── components/        → éléments réutilisables (TaskRow, StampBadge, LedgerLine...)
├── pages/              → vues (Dashboard, Login, Register, Profile)
├── services/           → appels API (équivalent "model" côté client)
├── context/            → gestion d'état global (auth, tâches)
└── styles/             → tokens de design (couleurs, typo)
```

---

## 5. Modèle de données (simplifié)

**User**
- id, name, email, password (hashé), createdAt

**List**
- id, title, userId (référence au propriétaire), createdAt

**Task**
- id, title, description, dueDate, priority (low/medium/high), status (todo/in_progress/done), listId, userId, createdAt

---

## 6. Mécanisme d'authentification (flux)

1. **Inscription** : l'utilisateur envoie email + mot de passe → le backend hash le mot de passe (bcrypt) → crée l'utilisateur en base.
2. **Connexion** : l'utilisateur envoie email + mot de passe → le backend vérifie le hash → génère un **token JWT** → le renvoie au frontend.
3. **Frontend** : stocke le token (localStorage ou cookie httpOnly, plus sécurisé) → l'ajoute dans le header `Authorization: Bearer <token>` à chaque requête vers une route protégée.
4. **Backend** : un middleware vérifie le token avant de laisser passer la requête vers les routes protégées (dashboard, tâches, etc.).
5. **Déconnexion** : suppression du token côté frontend.

---

## 7. API REST — endpoints principaux

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me            (infos de l'utilisateur connecté)

GET    /api/lists              (toutes les listes de l'utilisateur)
POST   /api/lists
PUT    /api/lists/:id
DELETE /api/lists/:id

GET    /api/tasks              (toutes les tâches, filtrables par liste)
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## 8. Étapes de développement (roadmap)

### Phase 1 — Setup & Backend de base (semaine 1)
- Initialiser le repo Git + structure de dossiers (frontend/ et backend/)
- Setup Express, connexion à la base de données
- Créer les modèles User, List, Task
- Implémenter register/login avec JWT + bcrypt

### Phase 2 — API complète (semaine 2)
- Implémenter toutes les routes CRUD (lists, tasks)
- Middleware d'authentification pour protéger les routes
- Tester l'API avec Postman/Thunder Client avant de toucher au frontend

### Phase 3 — Frontend de base (semaine 3)
- Setup React (Vite recommandé) + React Router
- Pages Login/Register connectées à l'API
- Stockage et gestion du token (Context API)
- Dashboard qui affiche les listes/tâches de l'utilisateur connecté

### Phase 4 — Fonctionnalités avancées (semaine 4)
- Création/édition/suppression de tâches et listes depuis l'UI
- Filtres, recherche
- Drag & drop (librairie type `@dnd-kit` ou `react-beautiful-dnd`)

### Phase 5 — Design & polish (selon tes méthodes de design)
- Application de ta charte graphique/maquettes
- Responsive (mobile/desktop)
- Petites animations, loaders, messages d'erreur clairs

### Phase 6 — Déploiement & finition CV
- Déployer le frontend (Vercel/Netlify) et le backend (Render/Railway)
- Base de données hébergée (MongoDB Atlas)
- README complet avec captures d'écran, lien de démo, stack utilisée
- Ajouter le lien GitHub + démo live sur le CV/LinkedIn

---

## 9. Statut des décisions

- ✅ Base de données : PostgreSQL
- ✅ Architecture : MVC (backend) + séparation claire des responsabilités (frontend)
- ✅ Design : direction "Cahier de bord" validée (voir section 4bis)
- Nom du projet : TaskFlow (à personnaliser si tu veux)

Prochaine étape : génération du backend (setup Express + PostgreSQL + Sequelize + modèles MVC + auth JWT).
