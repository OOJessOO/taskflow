export default {
  common: {
    loading: 'Chargement...',
    email: 'Email',
    password: 'Mot de passe',
  },

  nav: {
    login: 'Se connecter',
    register: 'S\'inscrire',
    dashboard: 'Tableau de bord',
    profile: 'Profil',
    logout: 'Se déconnecter',
  },

  language: {
    toggleLabel: 'Choisir la langue',
    fr: 'Français',
    en: 'English',
  },

  landing: {
    title1: 'Vos journées ont',
    title2: 'enfin un registre.',
    subtitle1: 'Fini les listes qui se perdent et les post-it qui s\'accumulent.',
    subtitle2: 'Un carnet vivant où chaque tâche trouve sa ligne, chaque priorité son tampon.',
    openRegister: 'Ouvrir un registre',
    openMyRegister: 'Ouvrir mon registre →',
    preview1: 'Préparer la présentation client',
    preview2: 'Relire le contrat de bail',
    preview3: 'Réserver les billets de train',
    tagline: 'Tenu au jour le jour, ligne après ligne.',
  },

  auth: {
    loginEyebrow: 'Retour au registre',
    loginTitle: 'Se connecter',
    loginSubmitting: 'Connexion...',
    loginNoAccount: 'Pas encore de compte ?',
    registerEyebrow: 'Nouveau registre',
    registerTitle: 'Créer un compte',
    registerSubmitting: 'Création...',
    registerSubmit: 'Ouvrir mon registre',
    registerHasAccount: 'Déjà un compte ?',
    name: 'Nom',
  },

  dashboard: {
    eyebrow: 'Registre du jour',
    title: 'Tableau de bord',
    newListPlaceholder: '+ Nouvelle liste',
    deleteListAria: 'Supprimer la liste {title}',
    deleteListConfirm: 'Supprimer cette liste ? Toutes les tâches qu\'elle contient seront supprimées aussi.',
    searchPlaceholder: 'Rechercher une tâche...',
    addTask: '+ Ajouter une tâche',
    loading: 'Chargement du registre...',
    noLists: 'Aucune liste pour l\'instant. Crée ta première liste à gauche pour commencer.',
    empty: 'Rien ici. Ajoute une tâche pour ouvrir cette page du registre.',
  },

  profile: {
    eyebrow: 'Fiche personnelle',
    title: 'Profil',
    uploading: 'Envoi...',
    changePhoto: 'Changer la photo',
    memberSince: 'Membre depuis',
    saveSuccess: 'Profil mis à jour avec succès.',
    editButton: 'Modifier mes informations',
    newPassword: 'Nouveau mot de passe (laisser vide pour ne pas changer)',
    cancel: 'Annuler',
    saving: 'Enregistrement...',
    save: 'Enregistrer',
  },

  notFound: {
    stamp: 'Page absente du registre',
    message: 'Cette page n\'existe pas, ou a été retirée du carnet.',
    home: 'Retour à l\'accueil',
  },

  status: {
    all: 'Toutes',
    todo: 'À faire',
    in_progress: 'En cours',
    done: 'Terminé',
    donePlural: 'Terminées',
  },

  priority: {
    low: 'Léger',
    medium: 'Moyen',
    high: 'Urgent',
    lowStamp: 'Léger',
    mediumStamp: 'Moyen',
    highStamp: 'Urgent',
    ariaPrefix: 'Priorité : {label}',
  },

  ledger: {
    markDone: 'Marquer comme terminée',
    markUndone: 'Marquer comme non terminée',
  },

  taskModal: {
    editing: 'Fiche existante',
    creating: 'Nouvelle fiche',
    close: 'Fermer',
    title: 'Titre',
    description: 'Description',
    dueDate: 'Échéance',
    priority: 'Priorité',
    status: 'Statut',
    delete: 'Supprimer',
    saving: 'Enregistrement...',
    save: 'Enregistrer',
  },

  passwordField: {
    hide: 'Masquer le mot de passe',
    show: 'Afficher le mot de passe',
    hideLabel: 'Masquer',
    showLabel: 'Afficher',
  },

  avatar: {
    alt: 'Photo de profil de {name}',
  },

  errors: {
    generic: 'Une erreur est survenue. Réessaie.',
    authRequired: 'Authentification requise.',
    userNotFound: 'Utilisateur introuvable.',
    invalidToken: 'Token invalide ou expiré.',
    validationError: 'Erreur de validation.',
    internalError: 'Erreur interne du serveur.',
    invalidCredentials: 'Identifiants invalides.',
    emailTaken: 'Un compte existe déjà avec cet email.',
    registerFieldsRequired: 'Nom, email et mot de passe sont requis.',
    loginFieldsRequired: 'Email et mot de passe sont requis.',
    listTitleRequired: 'Le titre de la liste est requis.',
    listNotFound: 'Liste introuvable.',
    taskFieldsRequired: 'Le titre et la liste sont requis.',
    taskNotFound: 'Tâche introuvable.',
    noFileUploaded: 'Aucun fichier envoyé.',
    emailAlreadyUsed: 'Cet email est déjà utilisé par un autre compte.',
    passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères.',
    unsupportedFileFormat: 'Format non supporté. Utilise JPG, PNG ou WebP.',
    fileTooLarge: 'Le fichier dépasse la taille maximale (3 Mo).',
  },
};
