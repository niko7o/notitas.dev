import Head from 'next/head'

import TodoList from '../components/TodoList';

const Home = () => (
  <>
    <Head>
      <title>notitas.dev</title>
      <meta name="description" content="Tus notitas en todas partes" />
      <meta name="keywords" content="notitas, notitas.dev, notes, notas" />
      <meta property="og:title" content="notitas.dev" key="title" />
      <meta property="og:description" content="Tus notitas en todas partes" key="description" />
      <meta name="author" content="nikoto" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <TodoList />
  </>
)

export default Home;