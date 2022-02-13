import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { sendEvent } from '../../utils/google-analytics';

import Button from '../Button';
import TodoItem from '../TodoItem';
import TextInput from '../TextInput';
import FormNoteError from '../FormNoteError';
import Author from '../Author';

import Modal from '../Modal';

import { useModalHandle } from '../../utils/hooks';

import { LOCAL_STORAGE_KEY } from '../../utils/constants';

import { containerVariants, itemVariants } from './animations';

import styles from './TodoList.module.scss';

const TodoList = () => {
  const inputRef = useRef(null);
  const itemRef = useRef(null);
  
  const [todoList, setTodoList] = useState([]); // @TO-DO: use /notes endpoint
  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const { isModalOpen, openModal, closeModal } = useModalHandle();

  useEffect(() => {
    const localTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localTodos?.length > 0) {
      setTodoList(JSON.parse(localTodos))
    }
    openModal();
  }, [])

  useEffect(() => {
    inputRef.current.focus()
  }, [todoList])

  const FORM_VALIDATIONS = {
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

    const formValidationsPassed = FORM_VALIDATIONS.isNoteLongEnough();

    if (formValidationsPassed) {
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
          {todoList.length > 0 && todoList.map(item => (
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
      
      {/* <AnimatePresence>
        {isModalOpen && (
          <Modal key="animatedModal" closeModal={closeModal}>
            <p>lorem ipsum dolor sit amet</p>
            <button onClick={closeModal}>
              Close
            </button>
          </Modal>
        )}
      </AnimatePresence> */}
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