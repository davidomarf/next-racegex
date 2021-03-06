import { AppProps } from 'next/app';

import './styles.scss';

import Layout from '@components/Layout/Layout';
import Loader from '@components/Loader/Loader';

import useLoader from '@hooks/use-loader';
import { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';

const easing = [0.6, -0.05, 0.01, 0.99];

function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: { Title: string } }) {
  const isLoading = useLoader();
  const router = useRouter();
  const title = Component['Title'] || 'lmao';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <AnimatePresence exitBeforeEnter>
        <Layout>
          {isLoading ? (
            <Loader />
          ) : (
            <motion.div
              exit={{
                opacity: 0,
              }}
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: easing },
              }}
            >
              <Component {...pageProps} key={router.route} />
            </motion.div>
          )}
        </Layout>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
