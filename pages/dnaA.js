import Head from 'next/head'
//import styles from '../styles/Home.module.css'
import Intro from '../components/dnaA/Intro'

export default function DnaA() {
  return (
    <div /*className={styles.container}*/>
      <Head>
        <title>DnaA Analysis</title>
        <meta name="description" content="View Results from PhaseFinder-LR" />
        <link rel="icon" href="/images/favicon/dna.svg" />
      </Head>
      <Intro />
    </div>
  )
}
