import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LOCALE_STORAGE_KEY = "notitasDevLocale";

const translations = {
  es: {
    meta: {
      title: "notitas.dev - Bloc de notitas",
      description: "Toma notitas en cualquier momento. Tus notas se guardan en tu navegador.",
      keywords: "notitas, notitas.dev, notes, notas",
    },
    language: {
      label: "Selector de idioma",
      switchToEnglish: "Cambiar a inglés",
      switchToSpanish: "Cambiar a español",
    },
    header: {
      homeLabel: "notitas.dev, inicio",
      privacy: "privado · local · tuyo",
      howItWorks: "Cómo funciona",
    },
    author: "hecho con ☕ por",
    todo: {
      workspaceLabel: "Tus notas",
      noDate: "Sin fecha",
      now: "Ahora",
      spaceEyebrow: "TU ESPACIO",
      title: "Mis notitas",
      new: "Nueva",
      searchLabel: "Buscar en tus notas",
      searchPlaceholder: "Buscar en tus notas",
      clearSearch: "Limpiar búsqueda",
      note: "nota",
      notes: "notas",
      localOnly: "Solo en este navegador",
      activeSection: "Activas",
      doneSection: "Hechas",
      noActiveNotes: "No quedan notas activas.",
      noMatches: "No hay coincidencias",
      ideasStart: "Aquí empiezan tus ideas",
      tryOtherWords: "Prueba con otras palabras.",
      emptyListDescription: "Crea una nota y la guardaremos solo en este navegador.",
      firstNote: "Escribir mi primera nota",
      backToList: "Volver a la lista",
      newNote: "NUEVA NOTA",
      editing: "EDITANDO",
      unsaved: "Sin guardar",
      updated: "Actualizada",
      save: "Guardar",
      priorityLabel: "Prioridad",
      priorities: {
        high: "Alta",
        mid: "Media",
        low: "Baja",
      },
      setPriority: "Asignar prioridad",
      removePriority: "Quitar prioridad",
      markDone: "Marcar como hecha",
      restore: "Volver a activas",
      editorPlaceholder: "Escribe sin pensar demasiado…",
      contentLabel: "Contenido de la nota",
      word: "palabra",
      words: "palabras",
      wordAbbreviation: "pal.",
      characters: "caracteres",
      cancel: "Cancelar",
      confirmDelete: "Sí, eliminar",
      delete: "Eliminar nota",
      emptyEditorEyebrow: "UN LUGAR PARA PENSAR",
      emptyEditorTitle: ["Captura lo importante.", "Encuéntralo sin esfuerzo."],
      emptyEditorDescription: "Selecciona una nota de la lista o empieza una nueva. Las notas largas se abren aquí, sin ocupar todo tu listado.",
      create: "Crear una nota",
      placeholder: "Escribe aquí…",
      add: "Añadir nota",
      addWithShortcut: "Añadir nota (Enter)",
      edit: "Editar nota",
      remove: "Eliminar nota",
      errors: [
        "Escribe algo antes de guardar.",
        "La nota todavía está vacía.",
        "Añade una idea, aunque sea pequeña.",
        "Necesitamos al menos una palabra.",
      ],
      fallbackError: "Escribe algo, anda.",
    },
    info: {
      eyebrow: "SIMPLE A PROPÓSITO",
      title: "Tus ideas, sin ruido.",
      intro: "notitas.dev es un lugar rápido para apuntes, comentarios y pequeñas ideas sin abrir una herramienta más pesada.",
      writeTitle: "Escribe",
      writeBeforeShortcut: "Crea una nota y usa",
      writeAfterShortcut: "para guardarla sin apartar las manos del teclado.",
      findTitle: "Encuentra",
      findDescription: "Las notas largas se resumen en la lista. Busca, selecciona y edita el contenido completo a la derecha.",
      privacyTitle: "Privacidad local",
      privacyDescription: "Las notas viven únicamente en el almacenamiento de este navegador. Si cambias de dispositivo o borras sus datos, también se eliminarán tus notas.",
      github: "Ver el proyecto en GitHub",
    },
    modal: {
      label: "Cómo funciona notitas.dev",
      close: "Cerrar",
      closeInformation: "Cerrar información",
    },
  },
  en: {
    meta: {
      title: "notitas.dev - Quick notes",
      description: "Take quick notes at any time. Your notes stay in your browser.",
      keywords: "notitas, notitas.dev, notes, note taking",
    },
    language: {
      label: "Language selector",
      switchToEnglish: "Switch to English",
      switchToSpanish: "Switch to Spanish",
    },
    header: {
      homeLabel: "notitas.dev, home",
      privacy: "private · local · yours",
      howItWorks: "How it works",
    },
    author: "made with ☕ by",
    todo: {
      workspaceLabel: "Your notes",
      noDate: "No date",
      now: "Now",
      spaceEyebrow: "YOUR SPACE",
      title: "My notes",
      new: "New",
      searchLabel: "Search your notes",
      searchPlaceholder: "Search your notes",
      clearSearch: "Clear search",
      note: "note",
      notes: "notes",
      localOnly: "Only in this browser",
      activeSection: "Active",
      doneSection: "Done",
      noActiveNotes: "No active notes left.",
      noMatches: "No matches",
      ideasStart: "Your ideas start here",
      tryOtherWords: "Try different words.",
      emptyListDescription: "Create a note and we will save it only in this browser.",
      firstNote: "Write my first note",
      backToList: "Back to the list",
      newNote: "NEW NOTE",
      editing: "EDITING",
      unsaved: "Unsaved",
      updated: "Updated",
      save: "Save",
      priorityLabel: "Priority",
      priorities: {
        high: "High",
        mid: "Mid",
        low: "Low",
      },
      setPriority: "Set priority",
      removePriority: "Remove priority",
      markDone: "Mark as done",
      restore: "Move to active",
      editorPlaceholder: "Write without overthinking…",
      contentLabel: "Note content",
      word: "word",
      words: "words",
      wordAbbreviation: "words",
      characters: "characters",
      cancel: "Cancel",
      confirmDelete: "Yes, delete",
      delete: "Delete note",
      emptyEditorEyebrow: "A PLACE TO THINK",
      emptyEditorTitle: ["Capture what matters.", "Find it effortlessly."],
      emptyEditorDescription: "Select a note from the list or start a new one. Long notes open here without taking over your list.",
      create: "Create a note",
      placeholder: "Write here…",
      add: "Add note",
      addWithShortcut: "Add note (Enter)",
      edit: "Edit note",
      remove: "Delete note",
      errors: [
        "Write something before saving.",
        "The note is still empty.",
        "Add an idea, even a small one.",
        "We need at least one word.",
      ],
      fallbackError: "Please write something.",
    },
    info: {
      eyebrow: "SIMPLE BY DESIGN",
      title: "Your ideas, without the noise.",
      intro: "notitas.dev is a quick place for notes, comments, and small ideas without opening a heavier tool.",
      writeTitle: "Write",
      writeBeforeShortcut: "Create a note and use",
      writeAfterShortcut: "to save it without taking your hands off the keyboard.",
      findTitle: "Find",
      findDescription: "Long notes are summarized in the list. Search, select, and edit the full content on the right.",
      privacyTitle: "Local privacy",
      privacyDescription: "Notes live only in this browser's storage. If you change devices or clear its data, your notes will also be deleted.",
      github: "View the project on GitHub",
    },
    modal: {
      label: "How notitas.dev works",
      close: "Close",
      closeInformation: "Close information",
    },
  },
};

const LocaleContext = createContext(undefined);

export const LocaleProvider = ({ children }) => {
  const [locale, setLocaleState] = useState("es");

  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

    if (savedLocale === "en" || savedLocale === "es") {
      setLocaleState(savedLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale) => {
    if (nextLocale !== "en" && nextLocale !== "es") return;

    setLocaleState(nextLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
  };

  const value = useMemo(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);

  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context;
};
