import Head from "next/head";

import Hero from "../components/Hero";

const Home = () => (
  <>
    <Head>
      <title>notitas.dev | Bloc de notitas ⚡</title>
      <meta name="description" content="Tus notitas en todas partes" />
      <meta name="keywords" content="notitas, notitas.dev, notes, notas" />
      <meta property="og:title" content="notitas.dev" key="title" />
      <meta
        property="og:description"
        content="Tus notitas en todas partes"
        key="description"
      />
      <meta name="author" content="nikoto" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Hero />
  </>
);

export default Home;
