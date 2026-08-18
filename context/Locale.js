import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LOCALE_STORAGE_KEY = 'notitasDevLocale';

const translations = {
  es: {
    meta: {
      title: 'notitas.dev - Bloc de notitas',
      description: 'Toma notitas en cualquier momento. Tus notas se guardan en tu navegador.',
      keywords: 'notitas, notitas.dev, notes, notas',
    },
    language: {
      label: 'Selector de idioma',
      switchToEnglish: 'Cambiar a inglés',
      switchToSpanish: 'Cambiar a español',
    },
    hero: {
      imageAlt: 'Tarjetas de notas azules y naranjas con pestañas EN y ES',
      imageCaption: 'Tus notas, en tu idioma.',
    },
    author: 'hecho con ☕ por',
    todo: {
      placeholder: 'Escribe aquí…',
      add: 'Añadir nota',
      addWithShortcut: 'Añadir nota (Enter)',
      editing: 'Editando',
      edit: 'Editar nota',
      save: 'Guardar nota',
      remove: 'Eliminar nota',
      errors: [
        'Pero escribe algo, cabesa! 🤔',
        '¿Quieres escribir?',
        'Poeta de la familia… no eres.',
        'Compadre, te estás pasando. Escribe.',
      ],
      fallbackError: 'Escribe algo, anda.',
    },
    howItWorks: 'Cómo funciona',
  },
  en: {
    meta: {
      title: 'notitas.dev - Quick notes',
      description: 'Take quick notes at any time. Your notes stay in your browser.',
      keywords: 'notitas, notitas.dev, notes, note taking',
    },
    language: {
      label: 'Language selector',
      switchToEnglish: 'Switch to English',
      switchToSpanish: 'Switch to Spanish',
    },
    hero: {
      imageAlt: 'Blue and orange note cards with EN and ES tabs',
      imageCaption: 'Your notes, in your language.',
    },
    author: 'made with ☕ by',
    todo: {
      placeholder: 'Write here…',
      add: 'Add note',
      addWithShortcut: 'Add note (Enter)',
      editing: 'Editing',
      edit: 'Edit note',
      save: 'Save note',
      remove: 'Delete note',
      errors: [
        'Write something first! 🤔',
        'Would you like to write a note?',
        'Not feeling very poetic today?',
        'Come on, write something.',
      ],
      fallbackError: 'Please write something.',
    },
    howItWorks: 'How it works',
  },
};

const LocaleContext = createContext(undefined);

export const LocaleProvider = ({ children }) => {
  const [locale, setLocaleState] = useState('es');

  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

    if (savedLocale === 'en' || savedLocale === 'es') {
      setLocaleState(savedLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale) => {
    if (nextLocale !== 'en' && nextLocale !== 'es') return;

    setLocaleState(nextLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
  };

  const value = useMemo(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);

  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }

  return context;
};
