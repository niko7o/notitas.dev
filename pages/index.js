import Head from "next/head";

import Hero from "../components/Hero";

const Home = () => (
  <>
    <Head>
      <title>notitas.dev - Bloc de notitas ⚡</title>
      <meta
        property='og:title'
        content='Toma notitas en cualquier momento'
        key='title'
      />
      <meta
        property='og:description'
        content='Tus notitas en todas partes'
        key='description'
      />
      <meta name='keywords' content='notitas, notitas.dev, notes, notas' />
      <meta name='author' content='nikoto' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-H76FYP6CS0'
      ></script>
    </Head>
    <Hero />
  </>
);

export default Home;
