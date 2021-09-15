import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { loading, data } = useFetch('/api/hello');

  return (
    <div className={styles.container}>
      <Head>
        <title>Hello World</title>
        <meta name="description" content="Empty next with docker app" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello {loading ? 'loading...' : data.text}
        </h1>
      </main>
    </div>
  )
}

function useFetch(api: string) {
  const [state, setState] = useState<{loading: boolean; data: any}>({ loading: true, data: undefined });
  
  useEffect(() => {
    fetch(api).then((res) => {
      if (res) {
        res.json().then(data => {
          setState({ loading: false, data });
        })
      } else {
        setState({ loading: false, data: undefined });
      }
    });

    return () => {
      setState({ loading: true, data: undefined });
    };
  }, [api]);

  return state;
}

export default Home
