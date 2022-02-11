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

const TodoList = props => {
  console.log('props', props)
  const inputRef = useRef(null);
  const [todoList, setTodoList] = useState([]); // @TO-DO: use /notes endpoint
  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    inputRef.current.focus()
  }, [todoList])

  const formValidations = {
    isNoteLongEnough: () => inputRef.current.value.length > 0
  }

  const addTodoItem = () => {
    const inputValue = inputRef.current.value;
    const uniqueId = `${inputValue}#${Date.now()}`;
    const dateNow = new Date();

    if (formValidations.isNoteLongEnough()) {
      setTodoList([
        ...todoList,
        {
          id: uniqueId,
          title: inputValue,
          isCompleted: false,
          creationDate: dateNow
        }
      ])
      inputRef.current.value = '';
      sendEvent({ category: 'TodoList', label: 'addTodoItem', value: 'Success'})
    } else {
      showErrorForSeconds(3);
      setErrorCount(errorCount + 1)
      sendEvent({ category: 'TodoList', label: 'addTodoItem', value: 'Error'})
    }
  }

  const removeTodoItem = idToRemove => {
    const newTodos = todoList.filter(item => item.id !== idToRemove)
    setTodoList(newTodos);
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