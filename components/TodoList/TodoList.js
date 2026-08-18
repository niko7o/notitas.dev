import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import TodoItem from "../TodoItem";
import FormNoteError from "../FormNoteError";

import { LOCAL_STORAGE_KEY } from "../../utils/constants";
import { containerVariants, itemVariants } from "./animations";
import { useLocale } from "../../context/Locale";

import styles from "./TodoList.module.scss";

const PRIORITIES = ["high", "mid", "low"];

const formatDate = (date, locale, fallback) => {
  if (!date) return fallback;

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return fallback;

  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "short",
    year: parsedDate.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  }).format(parsedDate);
};

const TodoList = () => {
  const editorRef = useRef(null);
  const { locale, t } = useLocale();
  const [todoList, setTodoList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editorText, setEditorText] = useState("");
  const [editorPriority, setEditorPriority] = useState(null);
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
        const firstTodo = parsedTodos.find((todo) => !todo.isCompleted) || parsedTodos[0];
        setSelectedId(shouldOpenFirstNote ? firstTodo?.id || null : null);
        setEditorText(shouldOpenFirstNote ? firstTodo?.title || "" : "");
        setEditorPriority(shouldOpenFirstNote ? firstTodo?.priority || null : null);
      }
    } catch {
      setTodoList([]);
    }
  }, []);

  useEffect(() => {
    if ((selectedId || isCreating) && editorRef.current) editorRef.current.focus();
  }, [selectedId, isCreating]);

  const filteredTodos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase(locale);
    if (!normalizedQuery) return todoList;

    return todoList.filter((item) =>
      item.title.toLocaleLowerCase(locale).includes(normalizedQuery)
    );
  }, [locale, searchQuery, todoList]);

  const activeTodos = filteredTodos.filter((item) => !item.isCompleted);
  const completedTodos = filteredTodos.filter((item) => item.isCompleted);

  const selectedTodo = todoList.find((item) => item.id === selectedId);

  const persistTodos = (nextTodos) => {
    setTodoList(nextTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextTodos));
  };

  const beginNewNote = () => {
    setSelectedId(null);
    setEditorText("");
    setEditorPriority(null);
    setIsCreating(true);
    setDeleteArmed(false);
  };

  const selectNote = (item) => {
    setSelectedId(item.id);
    setEditorText(item.title);
    setEditorPriority(item.priority || null);
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
        priority: editorPriority,
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
        ? { ...todo, title: nextText, priority: editorPriority, updatedAt: new Date().toISOString() }
        : todo
    );
    persistTodos(nextTodos);
    setEditorText(nextText);
  };

  const updatePriority = (priority) => {
    const nextPriority = editorPriority === priority ? null : priority;
    setEditorPriority(nextPriority);

    if (!selectedTodo || isCreating) return;

    const nextTodos = todoList.map((todo) =>
      todo.id === selectedTodo.id
        ? { ...todo, priority: nextPriority, updatedAt: new Date().toISOString() }
        : todo
    );
    persistTodos(nextTodos);
  };

  const toggleSelectedCompletion = () => {
    if (!selectedTodo) return;

    const nextText = editorText.trim();
    if (!nextText) {
      setHasError(true);
      setErrorCount((count) => count + 1);
      window.setTimeout(() => setHasError(false), 3000);
      return;
    }

    const completedAt = selectedTodo.isCompleted ? null : new Date().toISOString();
    const nextTodos = todoList.map((todo) =>
      todo.id === selectedTodo.id
        ? {
            ...todo,
            title: nextText,
            priority: editorPriority,
            isCompleted: !todo.isCompleted,
            completedAt,
            updatedAt: new Date().toISOString(),
          }
        : todo
    );

    persistTodos(nextTodos);
    setEditorText(nextText);
    setDeleteArmed(false);
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
    setEditorPriority(nextSelection?.priority || null);
    setDeleteArmed(false);
  };

  const closeEditor = () => {
    setSelectedId(null);
    setEditorText("");
    setEditorPriority(null);
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
    <section className={styles.workspace} aria-label={t.todo.workspaceLabel}>
      <aside className={`${styles.sidebar} ${hasEditor ? styles["sidebar-hidden-mobile"] : ""}`}>
        <div className={styles["sidebar-header"]}>
          <div>
            <span className={styles.eyebrow}>{t.todo.spaceEyebrow}</span>
            <h1>{t.todo.title}</h1>
          </div>
          <button className={styles["new-note"]} onClick={beginNewNote} type="button">
            <span aria-hidden="true">+</span>
            {t.todo.new}
          </button>
        </div>

        <label className={styles.search}>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="sr-only">{t.todo.searchLabel}</span>
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t.todo.searchPlaceholder}
            type="search"
          />
          {searchQuery ? (
            <button type="button" onClick={() => setSearchQuery("")} aria-label={t.todo.clearSearch}>×</button>
          ) : null}
        </label>

        <div className={styles["list-meta"]}>
          <span>{filteredTodos.length} {filteredTodos.length === 1 ? t.todo.note : t.todo.notes}</span>
          <span>{t.todo.localOnly}</span>
        </div>

        <div className={styles["notes-scroll"]}>
          {filteredTodos.length > 0 ? (
            <>
              <section className={styles["note-section"]} aria-labelledby="active-notes-heading">
                <div className={styles["section-heading"]}>
                  <h2 id="active-notes-heading">{t.todo.activeSection}</h2>
                  <span>{activeTodos.length}</span>
                </div>
                {activeTodos.length > 0 ? (
                  <motion.div variants={containerVariants} initial="entering" animate="active">
                    {activeTodos.map((item) => (
                      <TodoItem
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        priority={item.priority}
                        creationDate={item.updatedAt || item.creationDate}
                        isSelected={item.id === selectedId}
                        animationVariants={itemVariants}
                        onSelect={() => selectNote(item)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <p className={styles["empty-section"]}>{t.todo.noActiveNotes}</p>
                )}
              </section>

              {completedTodos.length > 0 ? (
                <section className={`${styles["note-section"]} ${styles["done-section"]}`} aria-labelledby="done-notes-heading">
                  <div className={styles["section-heading"]}>
                    <h2 id="done-notes-heading">{t.todo.doneSection}</h2>
                    <span>{completedTodos.length}</span>
                  </div>
                  <motion.div variants={containerVariants} initial="entering" animate="active">
                    {completedTodos.map((item) => (
                      <TodoItem
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        priority={item.priority}
                        creationDate={item.updatedAt || item.creationDate}
                        isCompleted
                        isSelected={item.id === selectedId}
                        animationVariants={itemVariants}
                        onSelect={() => selectNote(item)}
                      />
                    ))}
                  </motion.div>
                </section>
              ) : null}
            </>
          ) : (
            <div className={styles["empty-list"]}>
              <span aria-hidden="true">{searchQuery ? "⌕" : "✦"}</span>
              <h2>{searchQuery ? t.todo.noMatches : t.todo.ideasStart}</h2>
              <p>{searchQuery ? t.todo.tryOtherWords : t.todo.emptyListDescription}</p>
              {!searchQuery ? <button type="button" onClick={beginNewNote}>{t.todo.firstNote}</button> : null}
            </div>
          )}
        </div>
      </aside>

      <main className={`${styles.editor} ${hasEditor ? styles["editor-visible"] : ""}`}>
        {hasEditor ? (
          <motion.div className={styles["editor-shell"]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <header className={styles["editor-header"]}>
              <button className={styles["back-button"]} type="button" onClick={closeEditor} aria-label={t.todo.backToList}>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
                  <path d="m15 18-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div>
                <span className={styles["editor-kicker"]}>{isCreating ? t.todo.newNote : t.todo.editing}</span>
                <p>{isCreating ? t.todo.unsaved : `${t.todo.updated} ${formatDate(selectedTodo?.updatedAt || selectedTodo?.creationDate, locale, t.todo.noDate)}`}</p>
              </div>
              <button className={styles["save-button"]} type="button" onClick={saveNote}>
                {t.todo.save}
                <span className={styles.shortcut}>⌘ ↵</span>
              </button>
            </header>

            <div className={styles["note-controls"]}>
              <div className={styles["priority-control"]} role="group" aria-label={t.todo.priorityLabel}>
                <span>{t.todo.priorityLabel}</span>
                <div>
                  {PRIORITIES.map((priority) => {
                    const isActive = editorPriority === priority;
                    const priorityLabel = t.todo.priorities[priority];

                    return (
                      <button
                        className={`${styles["priority-option"]} ${styles[`priority-${priority}`]} ${isActive ? styles["priority-selected"] : ""}`}
                        type="button"
                        key={priority}
                        aria-pressed={isActive}
                        aria-label={isActive ? `${t.todo.removePriority} ${priorityLabel}` : `${t.todo.setPriority} ${priorityLabel}`}
                        onClick={() => updatePriority(priority)}
                      >
                        <i aria-hidden="true" />
                        {priorityLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {!isCreating ? (
                <button className={styles["completion-button"]} type="button" onClick={toggleSelectedCompletion}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17">
                    {selectedTodo?.isCompleted ? (
                      <path d="M4 12a8 8 0 1 0 2.3-5.7M4 5v5h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      <path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                  </svg>
                  {selectedTodo?.isCompleted ? t.todo.restore : t.todo.markDone}
                </button>
              ) : null}
            </div>

            <div className={styles.paper}>
              <textarea
                ref={editorRef}
                value={editorText}
                onChange={(event) => setEditorText(event.target.value)}
                onKeyDown={handleEditorKeyDown}
                placeholder={t.todo.editorPlaceholder}
                aria-label={t.todo.contentLabel}
              />
              <AnimatePresence>
                {hasError ? <FormNoteError errorCount={errorCount} /> : null}
              </AnimatePresence>
            </div>

            <footer className={styles["editor-footer"]}>
              <span>{wordCount} {wordCount === 1 ? t.todo.word : t.todo.words} · {editorText.length} {t.todo.characters}</span>
              {!isCreating ? (
                <div className={styles["delete-actions"]}>
                  {deleteArmed ? (
                    <button type="button" className={styles.cancel} onClick={() => setDeleteArmed(false)}>{t.todo.cancel}</button>
                  ) : null}
                  <button
                    type="button"
                    className={`${styles.delete} ${deleteArmed ? styles["delete-confirm"] : ""}`}
                    onClick={removeSelectedNote}
                  >
                    {deleteArmed ? t.todo.confirmDelete : t.todo.delete}
                  </button>
                </div>
              ) : null}
            </footer>
          </motion.div>
        ) : (
          <div className={styles["editor-empty"]}>
            <div className={styles["empty-mark"]} aria-hidden="true">n.</div>
            <span className={styles.eyebrow}>{t.todo.emptyEditorEyebrow}</span>
            <h2>{t.todo.emptyEditorTitle[0]}<br />{t.todo.emptyEditorTitle[1]}</h2>
            <p>{t.todo.emptyEditorDescription}</p>
            <button type="button" onClick={beginNewNote}>{t.todo.create} <span aria-hidden="true">→</span></button>
          </div>
        )}
      </main>
    </section>
  );
};

export default TodoList;
