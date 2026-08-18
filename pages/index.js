import Head from "next/head";

import Hero from "../components/Hero";
import { useLocale } from "../context/Locale";

const Home = () => {
  const { locale, t } = useLocale();

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta property="og:title" content={t.meta.title} key="title" />
        <meta
          property="og:description"
          content={t.meta.description}
          key="description"
        />
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <meta name="author" content="nikoto" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:locale" content={locale === 'es' ? 'es_ES' : 'en_US'} />
      </Head>
      <Hero />
    </>
  );
};

export default Home;
