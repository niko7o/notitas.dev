import { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Button from '../Button';
import TodoItem from '../TodoItem';
import TextInput from '../TextInput';

import { containerVariants, itemVariants } from './animations';

import styles from './TodoList.module.scss';

const INITIAL_ITEMS = [
  {
    id: 'qwer',
    title: 'Kodak ColorPlus',
    isCompleted: false
  },
  {
    id: 'asdf',
    title: 'Fujifilm CK40',
    isCompleted: true
  }
];

const TodoList = () => {
  const inputRef = useRef(null);
  const [todoList, setTodoList] = useState(INITIAL_ITEMS); // @TO-DO: use /notes endpoint
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    inputRef.current.focus()
  }, [todoList])

  const formValidations = {
    isNoteLongEnough: () => inputRef.current.value.length > 0
  }

  const addTodoItem = e => {
    const inputValue = inputRef.current.value;
    const uniqueId = `${inputValue}#${Date.now()}`;

    const dateNow = new Date();
    // const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (formValidations.isNoteLongEnough()) {
      setTodoList([
        ...todoList,
        {
          id: uniqueId,
          title: inputValue,
          isCompleted: false,
          creationDate: dateNow.toLocaleDateString()
        }
      ])
      inputRef.current.value = '';
    } else {
      showErrorForSeconds(3);
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
      <div className={styles['author']}>
        <h1>notitas.dev</h1>
        <p>
          made with ☕ by{' '}
          <a
            href="https://nikoto.dev"
            target="_blank"
            rel="noreferrer"
            className={styles['author-name']}
          >
            nikoto
          </a>
        </p>
      </div>

      <AnimatePresence presenceAffectsLayout>
        <motion.div
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

        <AnimatePresence>
          <motion.div layout className={styles['form']}>
            <TextInput
              nodeRef={inputRef}
              onKeyPress={handleKeyPress}
              placeholder="Escribe aquí.."
            />
            
            <Button onClick={addTodoItem} title="Añadir nota (Enter)" /> 
            
            {hasError && (
              <motion.span
                initial={{ marginTop: '10px', opacity: 0, y: -20, color: 'crimson' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                Pero escribe algo, cabesa!
              </motion.span>
            )}
        </motion.div>
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${BASE_URL}/api/notes`)
  const notes = await res.json()

  return {
    props: {
      notes
    }
  }
}

export default TodoList;