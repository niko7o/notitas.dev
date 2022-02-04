import { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Button from '../Button';
import TodoItem from '../TodoItem';
import TextInput from '../TextInput';

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

export default function TodoList({ props }) {
  const itemTitleRef = useRef(null);
  const [todoList, setTodoList] = useState(INITIAL_ITEMS || []);

  useEffect(() => {
    itemTitleRef.current.focus()
  }, [])

  const addTodoItem = () => {
    const title = itemTitleRef?.current.value;
    const uniqueId = `${title}${Date.now()}`;

    const dateNow = new Date();
    // const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (title.length > 0) {
      setTodoList([
        ...todoList,
        {
          id: uniqueId,
          title,
          isCompleted: false,
          creationDate: dateNow.toLocaleDateString()
        }
      ])
      itemTitleRef.current.value = '';
    }
  }

  const removeTodoItem = idToRemove => {
    const newTodos = todoList.filter(item => item.id !== idToRemove)
    setTodoList(newTodos);
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      addTodoItem();
    }
  }

  return (
    <div style={{ margin: '0 auto', maxWidth: '600px' }}>

      <div style={{ margin: '48px auto' }}>
        <h1 style={{ fontSize: 48 }}>notitas.dev</h1>
        <p>
          made with ☕ by <a href="https://nikoto.dev" target="_blank" rel="noreferrer">nikoto</a>
        </p>
      </div>

      <AnimatePresence presenceAffectsLayout>
        {todoList.map(item => (
          <TodoItem
            id={item.id}
            key={item.id}
            title={item.title}
            creationDate={item.creationDate}
            isCompleted={item.isCompleted}
            onRemove={removeTodoItem}
          />
        ))}

        <motion.div
          layout
          style={{ display: 'grid', justifyContent: 'center' }}
        >
          <TextInput nodeRef={itemTitleRef} onKeyPress={handleKeyPress} placeholder="Escribe aquí.." />
          <Button onClick={addTodoItem} title="Añadir nota (Enter)" />
        </motion.div>
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
