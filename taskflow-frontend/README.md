# TaskFlow — Frontend

Application React (Vite) — Direction design "Cahier de bord" : registre analogique exécuté numériquement, pensée pour ne pas ressembler aux gabarits IA génériques.

## Installation

```bash
npm install
cp .env.example .env   # ajuste VITE_API_URL si besoin
npm run dev
```

Le backend doit tourner en parallèle (voir son propre README) pour que l'authentification et les données fonctionnent.

## Structure

```
src/
├── components/    → StampBadge, LedgerRow, AppShell, TaskModal, FormField...
├── pages/          → Landing, Login, Register, Dashboard, Profile, NotFound
├── services/        → appels API (api.js, authService, listService, taskService)
├── context/          → AuthContext, TasksContext (état global)
└── styles/            → tokens.css (couleurs, typographie, espacements)
```

## Système de design

- **Couleurs** : pierre `#DCD6C9`, encre `#232733`, mousse `#4A5D45`, ocre `#C08A2E`, brique `#8B3A3A`
- **Typographies** : Petrona (titres), Archivo (corps), Courier Prime (données/dates/badges)
- **Élément signature** : badges de priorité façon tampon encreur (`StampBadge.jsx`), bord irrégulier généré par filtre SVG (`SvgDefs.jsx`)
- **Layout** : tâches en lignes de registre (`LedgerRow.jsx`) avec réglure fine, listes affichées comme des intercalaires de classeur

## Pages

| Route | Page | Accès |
|---|---|---|
| `/` | Landing | public |
| `/inscription` | Register | public |
| `/connexion` | Login | public |
| `/tableau-de-bord` | Dashboard | protégée |
| `/profil` | Profile | protégée |
| `*` | 404 | public |

## Build

```bash
npm run build
```
