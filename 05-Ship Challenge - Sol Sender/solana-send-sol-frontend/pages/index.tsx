import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import { SendSolForm } from '../components/SendSolForm'
import Head from 'next/head'
import { Result } from '../components/Result'


const Home: NextPage = (props) => {

  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <AppBar />
      <div className={styles.AppBody}>
        <Result/>
        <SendSolForm />
      </div>
    </div>
  );
}

export default Home;