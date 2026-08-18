import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import TodoItem from "../TodoItem";
import FormNoteError from "../FormNoteError";

import { LOCAL_STORAGE_KEY } from "../../utils/constants";
import { containerVariants, itemVariants } from "./animations";

import styles from "./TodoList.module.scss";

const formatDate = (date) => {
  if (!date) return "Sin fecha";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Sin fecha";

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: parsedDate.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  }).format(parsedDate);
};

const TodoList = () => {
  const editorRef = useRef(null);
  const [todoList, setTodoList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editorText, setEditorText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [deleteArmed, setDeleteArmed] = useState(false);

  useEffect(() => {
    const localTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!localTodos) return;

    try {
      const parsedTodos = JSON.parse(localTodos);
      if (Array.isArray(parsedTodos)) {
        setTodoList(parsedTodos);
        const shouldOpenFirstNote = window.matchMedia("(min-width: 761px)").matches;
        setSelectedId(shouldOpenFirstNote ? parsedTodos[0]?.id || null : null);
        setEditorText(shouldOpenFirstNote ? parsedTodos[0]?.title || "" : "");
      }
    } catch {
      setTodoList([]);
    }
  }, []);

  useEffect(() => {
    if ((selectedId || isCreating) && editorRef.current) editorRef.current.focus();
  }, [selectedId, isCreating]);

  const filteredTodos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase("es");
    if (!normalizedQuery) return todoList;

    return todoList.filter((item) =>
      item.title.toLocaleLowerCase("es").includes(normalizedQuery)
    );
  }, [searchQuery, todoList]);

  const selectedTodo = todoList.find((item) => item.id === selectedId);

  const persistTodos = (nextTodos) => {
    setTodoList(nextTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextTodos));
  };

  const beginNewNote = () => {
    setSelectedId(null);
    setEditorText("");
    setIsCreating(true);
    setDeleteArmed(false);
  };

  const selectNote = (item) => {
    setSelectedId(item.id);
    setEditorText(item.title);
    setIsCreating(false);
    setDeleteArmed(false);
  };

  const saveNote = () => {
    const nextText = editorText.trim();

    if (!nextText) {
      setHasError(true);
      setErrorCount((count) => count + 1);
      window.setTimeout(() => setHasError(false), 3000);
      return;
    }

    if (isCreating) {
      const newTodo = {
        id: `${nextText[0]}#${Date.now()}`,
        title: nextText,
        isCompleted: false,
        creationDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const nextTodos = [newTodo, ...todoList];
      persistTodos(nextTodos);
      setSelectedId(newTodo.id);
      setEditorText(newTodo.title);
      setIsCreating(false);
      return;
    }

    if (!selectedTodo) return;

    const nextTodos = todoList.map((todo) =>
      todo.id === selectedTodo.id
        ? { ...todo, title: nextText, updatedAt: new Date().toISOString() }
        : todo
    );
    persistTodos(nextTodos);
    setEditorText(nextText);
  };

  const removeSelectedNote = () => {
    if (!deleteArmed) {
      setDeleteArmed(true);
      return;
    }

    const selectedIndex = todoList.findIndex((item) => item.id === selectedId);
    const nextTodos = todoList.filter((item) => item.id !== selectedId);
    const nextSelection = nextTodos[Math.min(selectedIndex, nextTodos.length - 1)] || null;

    persistTodos(nextTodos);
    setSelectedId(nextSelection?.id || null);
    setEditorText(nextSelection?.title || "");
    setDeleteArmed(false);
  };

  const closeEditor = () => {
    setSelectedId(null);
    setEditorText("");
    setIsCreating(false);
    setDeleteArmed(false);
  };

  const handleEditorKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      saveNote();
    }

    if (event.key === "Escape") closeEditor();
  };

  const hasEditor = Boolean(selectedTodo || isCreating);
  const wordCount = editorText.trim() ? editorText.trim().split(/\s+/).length : 0;

  return (
    <section className={styles.workspace} aria-label="Tus notas">
      <aside className={`${styles.sidebar} ${hasEditor ? styles["sidebar-hidden-mobile"] : ""}`}>
        <div className={styles["sidebar-header"]}>
          <div>
            <span className={styles.eyebrow}>TU ESPACIO</span>
            <h1>Mis notitas</h1>
          </div>
          <button className={styles["new-note"]} onClick={beginNewNote} type="button">
            <span aria-hidden="true">+</span>
            Nueva
          </button>
        </div>

        <label className={styles.search}>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Buscar en tus notas</span>
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Buscar en tus notas"
            type="search"
          />
          {searchQuery ? (
            <button type="button" onClick={() => setSearchQuery("")} aria-label="Limpiar búsqueda">×</button>
          ) : null}
        </label>

        <div className={styles["list-meta"]}>
          <span>{filteredTodos.length} {filteredTodos.length === 1 ? "nota" : "notas"}</span>
          <span>Solo en este navegador</span>
        </div>

        <div className={styles["notes-scroll"]}>
          {filteredTodos.length > 0 ? (
            <motion.div variants={containerVariants} initial="entering" animate="active">
              {filteredTodos.map((item) => (
                <TodoItem
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  creationDate={item.updatedAt || item.creationDate}
                  isSelected={item.id === selectedId}
                  animationVariants={itemVariants}
                  onSelect={() => selectNote(item)}
                />
              ))}
            </motion.div>
          ) : (
            <div className={styles["empty-list"]}>
              <span aria-hidden="true">{searchQuery ? "⌕" : "✦"}</span>
              <h2>{searchQuery ? "No hay coincidencias" : "Aquí empiezan tus ideas"}</h2>
              <p>{searchQuery ? "Prueba con otras palabras." : "Crea una nota y la guardaremos solo en este navegador."}</p>
              {!searchQuery ? <button type="button" onClick={beginNewNote}>Escribir mi primera nota</button> : null}
            </div>
          )}
        </div>
      </aside>

      <main className={`${styles.editor} ${hasEditor ? styles["editor-visible"] : ""}`}>
        {hasEditor ? (
          <motion.div className={styles["editor-shell"]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <header className={styles["editor-header"]}>
              <button className={styles["back-button"]} type="button" onClick={closeEditor} aria-label="Volver a la lista">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
                  <path d="m15 18-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div>
                <span className={styles["editor-kicker"]}>{isCreating ? "NUEVA NOTA" : "EDITANDO"}</span>
                <p>{isCreating ? "Sin guardar" : `Actualizada ${formatDate(selectedTodo?.updatedAt || selectedTodo?.creationDate)}`}</p>
              </div>
              <button className={styles["save-button"]} type="button" onClick={saveNote}>
                Guardar
                <span className={styles.shortcut}>⌘ ↵</span>
              </button>
            </header>

            <div className={styles.paper}>
              <textarea
                ref={editorRef}
                value={editorText}
                onChange={(event) => setEditorText(event.target.value)}
                onKeyDown={handleEditorKeyDown}
                placeholder="Escribe sin pensar demasiado…"
                aria-label="Contenido de la nota"
              />
              <AnimatePresence>
                {hasError ? <FormNoteError errorCount={errorCount} /> : null}
              </AnimatePresence>
            </div>

            <footer className={styles["editor-footer"]}>
              <span>{wordCount} {wordCount === 1 ? "palabra" : "palabras"} · {editorText.length} caracteres</span>
              {!isCreating ? (
                <div className={styles["delete-actions"]}>
                  {deleteArmed ? (
                    <button type="button" className={styles.cancel} onClick={() => setDeleteArmed(false)}>Cancelar</button>
                  ) : null}
                  <button
                    type="button"
                    className={`${styles.delete} ${deleteArmed ? styles["delete-confirm"] : ""}`}
                    onClick={removeSelectedNote}
                  >
                    {deleteArmed ? "Sí, eliminar" : "Eliminar nota"}
                  </button>
                </div>
              ) : null}
            </footer>
          </motion.div>
        ) : (
          <div className={styles["editor-empty"]}>
            <div className={styles["empty-mark"]} aria-hidden="true">n.</div>
            <span className={styles.eyebrow}>UN LUGAR PARA PENSAR</span>
            <h2>Captura lo importante.<br />Encuéntralo sin esfuerzo.</h2>
            <p>Selecciona una nota de la lista o empieza una nueva. Las notas largas se abren aquí, sin ocupar todo tu listado.</p>
            <button type="button" onClick={beginNewNote}>Crear una nota <span aria-hidden="true">→</span></button>
          </div>
        )}
      </main>
    </section>
  );
};

export default TodoList;
