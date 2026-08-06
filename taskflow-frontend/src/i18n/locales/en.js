export default {
  common: {
    loading: 'Loading...',
    email: 'Email',
    password: 'Password',
  },

  nav: {
    login: 'Sign in',
    register: 'Sign up',
    dashboard: 'Dashboard',
    profile: 'Profile',
    logout: 'Sign out',
  },

  language: {
    toggleLabel: 'Choose language',
    fr: 'Français',
    en: 'English',
  },

  landing: {
    title1: 'Your days finally',
    title2: 'have a ledger.',
    subtitle1: 'No more lists that get lost or sticky notes piling up.',
    subtitle2: 'A living notebook where every task finds its line, every priority its stamp.',
    openRegister: 'Open a ledger',
    openMyRegister: 'Open my ledger →',
    preview1: 'Prepare the client presentation',
    preview2: 'Review the lease agreement',
    preview3: 'Book the train tickets',
    tagline: 'Kept day by day, line after line.',
  },

  auth: {
    loginEyebrow: 'Back to the ledger',
    loginTitle: 'Sign in',
    loginSubmitting: 'Signing in...',
    loginNoAccount: 'No account yet?',
    registerEyebrow: 'New ledger',
    registerTitle: 'Create an account',
    registerSubmitting: 'Creating...',
    registerSubmit: 'Open my ledger',
    registerHasAccount: 'Already have an account?',
    name: 'Name',
  },

  dashboard: {
    eyebrow: 'Today\'s ledger',
    title: 'Dashboard',
    newListPlaceholder: '+ New list',
    deleteListAria: 'Delete list {title}',
    deleteListConfirm: 'Delete this list? All the tasks it contains will be deleted too.',
    searchPlaceholder: 'Search a task...',
    addTask: '+ Add a task',
    loading: 'Loading the ledger...',
    noLists: 'No lists yet. Create your first list on the left to get started.',
    empty: 'Nothing here. Add a task to open this page of the ledger.',
  },

  profile: {
    eyebrow: 'Personal record',
    title: 'Profile',
    uploading: 'Uploading...',
    changePhoto: 'Change photo',
    memberSince: 'Member since',
    saveSuccess: 'Profile updated successfully.',
    editButton: 'Edit my information',
    newPassword: 'New password (leave blank to keep current)',
    cancel: 'Cancel',
    saving: 'Saving...',
    save: 'Save',
  },

  notFound: {
    stamp: 'Page missing from the ledger',
    message: 'This page does not exist, or has been removed from the notebook.',
    home: 'Back to home',
  },

  status: {
    all: 'All',
    todo: 'To do',
    in_progress: 'In progress',
    done: 'Done',
    donePlural: 'Done',
  },

  priority: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    lowStamp: 'Low',
    mediumStamp: 'Medium',
    highStamp: 'Urgent',
    ariaPrefix: 'Priority: {label}',
  },

  ledger: {
    markDone: 'Mark as done',
    markUndone: 'Mark as not done',
  },

  taskModal: {
    editing: 'Existing record',
    creating: 'New record',
    close: 'Close',
    title: 'Title',
    description: 'Description',
    dueDate: 'Due date',
    priority: 'Priority',
    status: 'Status',
    delete: 'Delete',
    saving: 'Saving...',
    save: 'Save',
  },

  passwordField: {
    hide: 'Hide password',
    show: 'Show password',
    hideLabel: 'Hide',
    showLabel: 'Show',
  },

  avatar: {
    alt: 'Profile picture of {name}',
  },

  errors: {
    generic: 'Something went wrong. Please try again.',
    authRequired: 'Authentication required.',
    userNotFound: 'User not found.',
    invalidToken: 'Invalid or expired token.',
    validationError: 'Validation error.',
    internalError: 'Internal server error.',
    invalidCredentials: 'Invalid credentials.',
    emailTaken: 'An account already exists with this email.',
    registerFieldsRequired: 'Name, email and password are required.',
    loginFieldsRequired: 'Email and password are required.',
    listTitleRequired: 'A list title is required.',
    listNotFound: 'List not found.',
    taskFieldsRequired: 'Title and list are required.',
    taskNotFound: 'Task not found.',
    noFileUploaded: 'No file uploaded.',
    emailAlreadyUsed: 'This email is already used by another account.',
    passwordTooShort: 'Password must be at least 6 characters long.',
    unsupportedFileFormat: 'Unsupported format. Use JPG, PNG or WebP.',
    fileTooLarge: 'File exceeds the maximum size (3 MB).',
  },
};
