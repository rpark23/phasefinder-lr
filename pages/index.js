import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Welcome from '../components/Welcome'
import Results from '../components/results/Results'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PhaseFinder-LR Results</title>
        <meta name="description" content="View Results from PhaseFinder-LR" />
        <link rel="icon" href="/images/favicon/dna.svg" />
      </Head>
      <Welcome />
      <Results/>
    </div>
  )
}
