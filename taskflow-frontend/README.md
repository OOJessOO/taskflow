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
├── components/    → StampBadge, LedgerRow, AppShell, TaskModal, FormField, LanguageToggle...
├── pages/          → Landing, Login, Register, Dashboard, Profile, NotFound
├── services/        → appels API (api.js, authService, listService, taskService)
├── context/          → AuthContext, TasksContext, LanguageContext (état global)
├── i18n/             → locales/ (dictionnaires fr.js et en.js)
├── utils/            → errorMessage.js (traduction des codes d'erreur backend)
└── styles/            → tokens.css (couleurs, typographie, espacements)
```

## Internationalisation (FR/EN)

L'application est entièrement bilingue. Le changement de langue est disponible via le sélecteur `LanguageToggle.jsx` (landing + sidebar) et se persiste dans le `localStorage`.

- **`i18n/locales/fr.js` / `en.js`** : dictionnaires de traduction (clés organisées par section)
- **`context/LanguageContext.jsx`** : fournit `t('clé')` (avec interpolation `{param}`), `formatDate()` (locale `fr-FR`/`en-US`) et `setLang()`
- **`utils/errorMessage.js`** : le backend renvoie des codes d'erreur stables (`INVALID_CREDENTIALS`, `LIST_NOT_FOUND`...) traduits côté frontend selon la langue active

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
