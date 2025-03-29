import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Example translations for English, French and Spanish.
const resources = {
  en: {
    translation: {
      // General
      settings: "Settings",
      explore: "Explore",
      language: "Language",
      notifications: "Notifications",
      appearance: "Appearance",
      dark: "Dark",
      light: "Light",
      deleteAccount: "Delete Account",

      // Auth / Index Page
      enterYourEmail: "Enter your email",
      enterYourPassword: "Enter your password",
      signIn: "Sign In",
      dontHaveAccount: "Don't have an account?",
      createNow: "Create now",
      loginFailed: "Login failed",

      // Explore Page
      helloUser: "Hello, {{name}}", // use as t('helloUser', { name: userName })
      permissionDenied: "Permission to access location was denied"
    },
  },
  fr: {
    translation: {
      // General
      settings: "Paramètres",
      explore: "Explorer",
      language: "Langue",
      notifications: "Notifications",
      appearance: "Apparence",
      dark: "Sombre",
      light: "Clair",
      deleteAccount: "Supprimer le compte",

      // Auth / Index Page
      enterYourEmail: "Entrez votre email",
      enterYourPassword: "Entrez votre mot de passe",
      signIn: "Se connecter",
      dontHaveAccount: "Vous n'avez pas de compte ?",
      createNow: "Créez maintenant",
      loginFailed: "Échec de la connexion",

      // Explore Page
      helloUser: "Bonjour, {{name}}",
      permissionDenied: "L'autorisation d'accéder à la localisation a été refusée"
    },
  },
  es: {
    translation: {
      // General
      settings: "Configuración",
      explore: "Explorar",
      language: "Idioma",
      notifications: "Notificaciones",
      appearance: "Apariencia",
      dark: "Oscuro",
      light: "Claro",
      deleteAccount: "Eliminar Cuenta",

      // Auth / Index Page
      enterYourEmail: "Introduce tu correo",
      enterYourPassword: "Introduce tu contraseña",
      signIn: "Iniciar sesión",
      dontHaveAccount: "¿No tienes cuenta?",
      createNow: "Crea una ahora",
      loginFailed: "Error al iniciar sesión",

      // Explore Page
      helloUser: "Hola, {{name}}",
      permissionDenied: "Se denegó el permiso para acceder a la ubicación"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale.split("-")[0], // default language based on device locale
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;