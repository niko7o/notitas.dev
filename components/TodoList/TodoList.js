import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { sendEvent } from '../../utils/google-analytics';

import Button from '../Button';
import TodoItem from '../TodoItem';
import TextInput from '../TextInput';
import FormNoteError from '../FormNoteError';
import Author from '../Author';

import { containerVariants, itemVariants } from './animations';

import styles from './TodoList.module.scss';

const LOCAL_STORAGE_KEY = 'notitasDevTodos'

const TodoList = props => {
  const inputRef = useRef(null);
  
  const [todoList, setTodoList] = useState([]); // @TO-DO: use /notes endpoint
  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    inputRef.current.focus()
  }, [todoList])

  useEffect(() => {
    const localTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localTodos?.length > 0) {
      setTodoList(JSON.parse(localTodos))
    }
  }, [])

  const formValidations = {
    isNoteLongEnough: () => inputRef.current.value.length > 0
  }

  const addTodoItem = () => {
    const inputValue = inputRef.current.value;
    const uniqueId = `${inputValue[0]}#${Date.now()}`;
    const date = new Date();

    const newTodo = {
      id: uniqueId,
      title: inputValue,
      isCompleted: false,
      creationDate: date
    }

    if (formValidations.isNoteLongEnough()) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...todoList, newTodo ]));
      setTodoList([...todoList, newTodo ]);
      inputRef.current.value = '';
      sendEvent({ category: 'TodoList', label: 'addTodoItem', value: 'Success'})
    } else {
      showErrorForSeconds(3);
      setErrorCount(errorCount + 1)
      sendEvent({ category: 'TodoList', label: 'addTodoItem', value: 'Error'})
    }
  }

  const removeTodoItem = idToRemove => {
    const filteredTodos = todoList.filter(item => item.id !== idToRemove)
    setTodoList(filteredTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredTodos));
  }

  const handleKeyPress = event => {
    // @TO-DO: Implement keyboard navigation/shortcuts (arrows + del)
    if (event.key === 'Enter') {
      addTodoItem();
    }
  }

  const showErrorForSeconds = seconds => {
    setHasError(true);
    setTimeout(() => {
      setHasError(false);
    }, seconds * 1000);
  }

  return (
    <div className={styles['todo-list']}>
      <AnimatePresence>
        <motion.div
          key="todoContainer"
          variants={containerVariants}
          initial="entering"
          animate="active"
          exit="exiting"
        >
          {todoList.map(item => (
            <TodoItem
              id={item.id}
              key={item.id}
              title={item.title}
              creationDate={item.creationDate}
              isCompleted={item.isCompleted}
              onRemove={removeTodoItem}
              animationVariants={itemVariants}
            />
          ))}
        </motion.div>

        <motion.div key="todoFormInput" layout className={styles['form']}>
          <TextInput
            nodeRef={inputRef}
            onKeyPress={handleKeyPress}
            placeholder="Escribe aquí.."
          />
          <Button onClick={addTodoItem} title="Añadir nota (Enter)" /> 
          {hasError && <FormNoteError errorCount={errorCount}/>}
        </motion.div>
      </AnimatePresence>
      <Author />
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/notes`)
  const notes = await res.json()

  return {
    props: {
      notes
    }
  }
}

export default TodoList;